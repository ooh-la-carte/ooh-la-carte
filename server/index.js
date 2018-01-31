require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const auth = require('./authHelpers.js');
const User = require('../database/models/user.js');


const PORT = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));

app.use((req, res, next) => {
  // log each request to the console
  console.log(req.method, req.url);
  // continue doing what we were doing and go to the route
  next();
});

app.get('/api/test', (req, res) => {
  res.json({ text: 'response' });
});

// post route for login requests
app.post('/api/login', (req, res) => {
  // verify user and password against database
  User.getAndVerifyUser(req.body.username, req.body.password)
    .then((userId) => {
      if (userId) {
        res.status(200);
        // create the token
        const token = jwt.sign({}, 'super-secret');
        // send the token back to the client
        res.json({
          token,
          userId,
        });
        res.send();
      } else {
        res.sendStatus(403);
      }
    });
});

// post route for signup requests
app.post('/api/signup', (req, res) => {
  User.insertUser(req.body.username, req.body.password1, `${req.body.username}@email.com`)
    .then((userId) => {
      if (userId) {
        res.status(200);
        // create the token
        const token = jwt.sign({}, 'super-secret');
        // send the token back to the client
        res.json({
          token,
          userId,
        });
        res.send();
      } else {
        res.sendStatus(409);
      }
    })
    .catch((error) => { console.log(error); });
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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '../public/index.html')));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
