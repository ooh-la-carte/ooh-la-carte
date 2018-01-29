const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const auth = require('./authHelpers.js');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/api/test', (req, res) => {
  res.json({ text: 'response' });
});

// post route for login requests
app.post('/api/login', (req, res) => {
  console.log('body', req.body);
  // verify user and password against database
  // \/ if login data is stored in the database change this to database call
  const { username } = req.body;
  if (auth.fakeVerifyUser(username)) {
    // create the token
    const token = jwt.sign({ username }, 'super-secret');
    // send the token back to the client
    res.json({
      token,
      userId: true,
    });
  } else {
    res.sendStatus(403);
  }
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

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
