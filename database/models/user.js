const db = require('../index');
const bcrypt = require('bcrypt');

const User = {};

User.findUser = username => (
  db.knex('users')
    .where({ username })
    .then(data => data)
    .catch((err) => { console.log(err); })
);

User.insertUser = (username, password, email) => (
  bcrypt.hash(password, 10)
    .then(hash => (
      db.knex('users').insert({
        username,
        password: hash,
        email,
      })
    ))
    .then((userIDInserted) => {
      console.log('user sucessfully inserted');
      return userIDInserted;
    })
    .then(() => User.findUser(username))
    .then(data => data[0].id)
    .catch((err) => { console.log(err); })
);

User.getAndVerifyUser = (username, password) => {
  let userId;
  return User.findUser(username)
    .then((results) => {
      userId = results[0].id;
      return bcrypt.compare(password, results[0].password);
    })
    .then(result => (result ? userId : null));
};

module.exports = User;
