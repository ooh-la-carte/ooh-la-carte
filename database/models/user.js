const knex = require('../index');
const bcrypt = require('bcrypt');

const User = {};


User.findUserByName = username => (
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

User.findChefs = () => (
  knex('users').where('is_chef', true)
);

User.findUserById = id => (
  knex('users').where('id', id).select('is_chef', 'street_name', 'city', 'state', 'zip_code', 'name', 'phone', 'email', 'id', 'rate', 'cuisine', 'username').then()
);

User.findCuisinesById = id => (
  knex('users_cuisines').where('chef_id', id).select('cuisine', 'custom_description').then()
);

User.insertCuisineById = (userObj) => {
  const { id, cuisine, description, userCuisines } = userObj;
  return knex('users_cuisines').insert({
    chef_id: id,
    cuisine,
    custom_description: description,
  })
    .then(() => knex('users').where({ id }).update({ cuisine: userCuisines }))
    .then((insertResult) => {
      console.log('cuisine sucessfully inserted');
      return insertResult;
    })
    .catch((err) => { console.log(err); });
};

User.deleteCuisineById = (userObj) => {
  const { id, cuisine } = userObj;
  return knex('users_cuisines')
    .where({ cuisine })
    .andWhere({ chef_id: id })
    .del();
};

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
    .then(() => User.findUserByName(username))
    .then(data => ({
      userId: data[0].id,
      isChef: data[0].is_chef,
      username: data[0].username,
    }))
    .catch((err) => { console.log(err); });
};

User.insertContactInfo = (id, name, streetAddress, city, state, zipcode, phone, email) => knex('users')
  .where('id', id)
  .update({
    name, street_name: streetAddress, city, state, zip_code: zipcode, phone, email,
  });

User.updateCuisineSelection = (id, cuisine) => knex('users')
  .where('id', id)
  .update({ cuisine });

User.updateChefRate = (id, rate) => knex('users')
  .where('id', id)
  .update({ rate });

User.getAndVerifyUser = (username, password) => {
  let userId;
  let isChef;
  return User.findUserByName(username)
    .then((results) => {
      userId = results[0].id;
      isChef = results[0].is_chef;
      return bcrypt.compare(password, results[0].password);
    })
    .then(result => (result ? ({
      userId,
      isChef,
      username,
    }) : null))
    .catch((err) => { console.log(err); });
};

module.exports = User;
