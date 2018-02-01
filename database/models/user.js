const knex = require('../index');
const bcrypt = require('bcrypt');

const User = {};

User.findUser = username => (
  knex('users')
    .where({ username })
    .then(data => data)
    .catch((err) => { console.log(err); })
);

// OLD MODEL
// knex.select('*').from('users').innerJoin('addresses', function() {
//   this.on('users.address_id', 'addresses.id');
//   this.on('users.id', id);
// }).toSQL().sql;

User.findUserById = id => (
  knex('users').where('id', id).select('is_chef', 'street_name', 'city', 'state', 'zip_code', 'name', 'phone', 'email').then()
);

User.insertUser = (username, password, email, accType) => {
  let isAChef = false;
  if (accType === 'chef') isAChef = true;
  return bcrypt.hash(password, 10)
    .then(hash => (
      knex('users').insert({
        username,
        password: hash,
        email,
        is_chef: isAChef,
      })
    ))
    .then((insertResult) => {
      console.log('user sucessfully inserted');
      return insertResult;
    })
    .then(() => User.findUser(username))
    .then(data => ({
      userId: data[0].id,
      isChef: data[0].is_chef,
    }))
    .catch((err) => { console.log(err); });
};

User.getAndVerifyUser = (username, password) => {
  let userId;
  let isChef;
  return User.findUser(username)
    .then((results) => {
      userId = results[0].id;
      isChef = results[0].is_chef;
      return bcrypt.compare(password, results[0].password);
    })
    .then(result => (result ? ({
      userId,
      isChef,
    }) : null));
};

module.exports = User;
