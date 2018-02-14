require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const socket = require('socket.io');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const cookieSession = require('cookie-session');
const auth = require('./authHelpers.js');
const User = require('../database/models/user.js');
const Event = require('../database/models/event.js');
const Messaging = require('../database/models/messaging');
const SocketManager = require('./SocketManager');
const authRoutes = require('./routes/authRoutes.js');


/*
  ==============================
    Server
  ==============================
*/

const PORT = process.env.PORT || 3000;
const app = express();

/*
  ==============================
    Chat Server
  ==============================
*/
const server = http.createServer(app);

const io = socket(server);

io.on('connection', SocketManager);

/*
  ==============================
    Middleware
  ==============================
*/

app.use(express.static(path.join(__dirname, '/../public')));
// log each request to the console
app.use((req, res, next) => {
  console.log(req.method, req.url);
  // continue doing what we were doing and go to the route
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['super-secret-key'],
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);

// middleware to return a compressed bundle
app.get('*bundle.js', (req, res, next) => {
  req.url += '.gz';
  console.log(req.url);
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

/*
  ==============================
    Post Routes
  ==============================
*/

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

app.post('/api/user/acceptEvent', (req, res) => {
  Event.acceptEvent(req.body)
    .then(() => {
      Event.addChefToEvent(req.body)
        .then(() => res.sendStatus(201));
    });
});

// post route for updating events
app.post('/api/editEvent', (req, res) => {
  Event.editEvent(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => { console.log(error); });
});

app.post('/api/user/declineEvent', (req, res) => {
  Event.declineEvent(req.body)
    .then(() => res.sendStatus(201));
});

// post route for signup requests
app.post('/api/signup', (req, res) => {
  const user = req.body.username;
  const pw = req.body.password1;
  const { email } = req.body;
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

// post route for updating contact info
app.post('/api/updateContactInfo', (req, res) => {
  const user = req.body;
  const params = {
    id: user.id,
    street_name: user.streetAddress,
    city: user.city,
    state: user.state,
    zip_code: user.zip_code,
    phone: user.phone,
    email: user.email,
    facebook: user.facebook,
    twitter: user.twitter,
    instagram: user.instagram,
  };

  if (user.isChef !== null) {
    params.is_chef = !!user.isChef;
    params.username = user.username;
  }

  User.insertContactInfo(params)
    .then(() => {
      res.sendStatus(200);
    });
});

// post request to update cuisine selections
app.post('/api/updateCuisineSelection', (req, res) => {
  const { id, cuisine } = req.body;
  User.updateCuisineSelection(id, cuisine)
    .then(() => {
      res.sendStatus(200);
    });
});

app.post('/api/updateUserDataByField', (req, res) => {
  const { id, field, updatedValue } = req.body;
  User.updateUserDataByField(id, field, updatedValue)
    .then(() => {
      res.sendStatus(200);
    });
});


// add cuisine selection to chef
app.post('/api/user/cuisines', (req, res) => {
  User.insertCuisineById(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => { console.log(error); });
});

app.post('/api/user/deleteCuisines', (req, res) => {
  User.deleteCuisineById(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => { console.log(error); });
});

// post request to update chef rate
app.post('/api/updateChefRate', (req, res) => {
  const { id, rate } = req.body;
  User.updateChefRate(id, rate)
    .then(() => {
      res.sendStatus(200);
    });
});

app.post('/api/updateEventRating', (req, res) => {
  Promise.resolve()
    .then(() => console.log(req.body))
    .then(() => Event.updateRating(req.body))
    .then(() => User.updateChefRating(req.body))
    .then(() => res.sendStatus(200));
});

app.post('/api/user/sendInvite', (req, res) => {
  User.sendInvite(req.body)
    .then(() => {
      res.sendStatus(201);
    });
});

/*
  ==============================
    Get Routes
  ==============================
*/

/* * *  User get routes  * * */

// This should be a protected route
app.get('/api/user/info', (req, res) => {
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

/* * *  Event get routes  * * */

// get route for returning events
// returns all events if no url query supplied
app.get('/api/events', (req, res) => {
  if (req.query.field) {
    const { field, target } = req.query;
    Event.findAllEventsByField(field, target)
      .then((results) => {
        res.type('json').json(results);
      })
      .catch((err) => { console.log(err); });
  } else {
    Event.findAllEvents()
      .then((data) => {
        res.type('json').json(data);
      })
      .catch((err) => { console.log(err); });
  }
});


app.get('/api/user/invitations', (req, res) => {
  if (req.query.is_chef === 'true') {
    User.getChefInvites(req.query.id)
      .then((invites) => {
        res.send(invites);
      });
  } else {
    User.getClientInvites(req.query.id)
      .then((invites) => {
        res.send(invites);
      });
  }
});

app.get('/api/user/cuisines', (req, res) => {
  User.findCuisinesById(req.query.id)
    .then((results) => {
      res.type('json').json(results);
    })
    .catch((err) => { console.log(err); });
});

app.get('/api/user/menus', (req, res) => {
  User.getMenuItems(req.query.id)
    .then((results) => {
      res.send(results);
    });
});

app.post('/api/user/saveMenuItem', (req, res) => {
  User.insertMenuItem(req.body)
    .then(() => res.sendStatus(201));
});

app.post('/api/user/editMenuItem', (req, res) => {
  User.editMenuItem(req.body)
    .then(() => res.sendStatus(201));
});

app.post('/api/user/deleteMenuItem', (req, res) => {
  User.deleteMenuItem(req.body)
    .then(() => res.sendStatus(201));
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
  ==============================
    Chat database calls
  ==============================
*/

app.post('/api/getConvos', (req, res) => {
  if (req.body.isChef === 'true') {
    Messaging.getConvosChef(req.body.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.send([]);
      });
  } else {
    Messaging.getConvosClient(req.body.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.send([]);
      });
  }
});

app.post('/api/convoMessages', (req, res) => {
  console.log('Get convo api call: ', req.body);
  Messaging.getMessages(req.body)
    .then((data) => {
      res.send(data);
    });
});

app.post('/api/insertMessage', (req, res) => {
  Messaging.insertMessage(req.body)
    .then(() => {
      Messaging.updateConvoTime(req.body)
        .then(() => {
          res.sendStatus(201);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

app.post('/api/conversations', (req, res) => {
  Messaging.checkExisitingConvos({
    user_id: req.body.user,
    chef_id: req.body.chef,
  })
    .then((data) => {
      if (data.dn) {
        console.log('creating convo insert');
        Messaging.createConvo(req.body)
          .then((data2) => {
            res.send(data2);
          })
          .catch(err => console.log(err));
      } else {
        console.log('Already exisits: ', data);
        res.send(data);
      }
    });
});

/*
  ==============================
    Start Server
  ==============================
*/

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
