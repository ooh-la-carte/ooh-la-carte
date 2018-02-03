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
  }).where('conversations.chef_id', chefId)
);

Messaging.getConvosClient = userId => (
  knex.select('conversations.id as chatId', 'users.username as recipient').from('conversations').innerJoin('users', function combiner() {
    this.on('users.id', 'conversations.user_id');
  }).where('conversations.user_id', userId)
);

module.exports = Messaging;
