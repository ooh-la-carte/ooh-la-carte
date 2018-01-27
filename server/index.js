const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const auth = require('./authHelpers.js');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.json({ text: 'response' });
});

// get route for login requests
app.post('/login', (req, res) => {
  // verify user and password against database
  // \/ remove the following line after database holds passwords
  const users = ['jake', 'mark', 'rick', 'jason'];

  console.log('body', req.body);

  // \/ if login data is stored in the database change this to database call
  if (users.includes(req.body.user)) {
    const { user } = req.body;

    // create the token
    const token = jwt.sign({ user }, 'super-secret');
    // send the token back to the client
    res.json({ token });
  } else {
    res.sendStatus(403);
  }
});

// example route that validates a token before sending a response
app.get('/protected', auth.ensureToken, (req, res) => {
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

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
