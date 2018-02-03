const knex = require('../index');

const Messaging = {};

Messaging.createConvo = convoObj => (
  knex('conversations').insert({
    user_id: convoObj.user,
    chef_id: convoObj.chef,
  })
    .then(() => (console.log('inserted'))).catch(err => console.log(err))
);

Messaging.getConvosChef = chefId => (
  knex.select('conversations.id as chatId', 'users.username as recipient').from('conversations').innerJoin('users', function combiner() {
    this.on('users.id', 'conversations.user_id');
    this.on('conversations.id', chefId);
  })
);

Messaging.getConvosClient = userId => (
  knex('conversations').where('user_id', userId)
);

// Messaging.insertUser = ({ hostId, date, location, partySize, meal, cuisine, description }) => (
//   knex('events').insert({
//     creator_id: hostId,
//     party_size: partySize,
//     address: location,
//     cuisine_type: cuisine,
//     date_type: date,
//     meal_type: meal,
//     description,
//   }).then().catch(err => console.log('error inserting event into database: ', err))
// );

module.exports = Messaging;
