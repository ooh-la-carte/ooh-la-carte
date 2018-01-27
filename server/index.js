const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser());

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '../public/index.html')));
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
