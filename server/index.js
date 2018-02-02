require('dotenv').config();
const express = require('express');
const http = require('http').Server(express());
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const auth = require('./authHelpers.js');
const User = require('../database/models/user.js');
const Event = require('../database/models/event.js');
const Messaging = require('../database/models/messaging');
const SocketManager = require('./SocketManager');


/* ################
    Chat Server
################## */

io.on('connection', SocketManager);

http.listen(8888, () => {
  console.log('listening on *:8888');
});

/* ################
    Server
################### */

const PORT = process.env.PORT || 3000;
const app = express();


/* ################
    Middleware
################### */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));


app.use((req, res, next) => {
  // log each request to the console
  console.log(req.method, req.url);
  // continue doing what we were doing and go to the route
  next();
});


/* ################
    Post Routes
################### */

// post route for login requests
app.post('/api/login', (req, res) => {
  // verify user and password against database
  User.getAndVerifyUser(req.body.username, req.body.password)
    .then((userDetails) => {
      if (userDetails) {
        res.status(200);
        // create the token
        const token = jwt.sign({ id: userDetails.userId }, 'super-secret');
        // send the token back to the client
        res.json({
          token,
          userId: userDetails.userId,
          isChef: userDetails.isChef,
          username: userDetails.username,
        });
        res.send();
      } else {
        res.sendStatus(403);
      }
    });
});

// post route for creating events
app.post('/api/createevent', (req, res) => {
  // req.body is the state object from the create event form
  Event.insertEvent(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => { console.log(error); });
});

// post route for signup requests
app.post('/api/signup', (req, res) => {
  const user = req.body.username;
  const pw = req.body.password1;
  const email = `${req.body.username}@email.com`;
  const accType = req.body.value;
  User.insertUser(user, pw, email, accType)
    .then((userObj) => {
      if (userObj.userId) {
        res.status(200);
        // create the token
        const token = jwt.sign({}, 'super-secret');
        // send the token back to the client
        res.json({
          token,
          userId: userObj.userId,
          isChef: userObj.isChef,
          username: userObj.username,
        });
        res.send();
      } else {
        res.sendStatus(409);
      }
    })
    .catch((error) => { console.log(error); });
});

/* ################
    Get Routes
################### */

// This should be a protected route
app.get('/api/user/info', (req, res) => {
  // console.log(req.headers);
  // res.end();
  // const token = req.headers.authorization;
  // console.log(token);

  // const decoded = jwt.verify(token, 'super-secret');
  // console.log(decoded);
  User.findUserById(req.query.id).then((data) => {
    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(data[0]));
  });
});

app.get('/api/getChefs', (req, res) => {
  User.findChefs()
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

app.get('/api/events', (req, res) => {
  console.log('hello');
  res.end();
});

// post route for creating events
app.post('/api/createevent', (req, res) => {
  res.sendStatus(200);
});

app.post('/api/updateContactInfo', (req, res) => {
  const { id, name, streetAddress, city, state, zipcode, phone, email } = req.body;
  User.insertContactInfo(id, name, streetAddress, city, state, zipcode, phone, email)
    .then(() => {
      res.sendStatus(200);
    });
});

// example route that validates a token before sending a response
app.get('/api/protected', auth.ensureToken, (req, res) => {
  // check the token against the secret to validate
  jwt.verify(req.token, 'super-secret', (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        text: 'protected',
        data,
      });
    }
  });
});

// catch all route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '../public/index.html')));
});

/*
  ============
  Chat database calls
  ============
*/

app.post('/api/getConvos', (req, res) => {
  console.log(req.body);
  if (req.body.isChef === 'true') {
    Messaging.getConvosChef(req.body.id)
      .then((data) => {
        console.log('chef convos: ', data);
        res.send(data);
      })
      .catch(err => console.log(err));
  } else {
    Messaging.getConvosClient(req.body.id)
      .then((data) => {
        console.log('Client convos: ', data);
        res.send(data);
      })
      .catch(err => console.log(err));
  }
});

app.post('/api/conversations', (req, res) => {
  console.log(req.body);
  Messaging.createConvo(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
});

/* ################
    Start Server
################### */

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
