const knex = require('../index');

const Messaging = {};

Messaging.createConvo = convoObj => (
  knex('conversations').insert({
    user_id: convoObj.user,
    chef_id: convoObj.chef,
  })
    .then(() => (console.log('inserted'))).catch(err => console.log(err))
);

Messaging.getMessages = (messageObj) => {
  return knex('messages').where({
    conversation_id: messageObj.id,
    user_id: messageObj.user,
  })
    .then((data) => {
      return data;
    })
    .catch(err => console.log(err));
};


Messaging.insertMessage = messageObj => (
  knex('messages').insert({
    user_id: messageObj.sender,
    conversation_id: messageObj.convo_id,
    text: messageObj.message,
  })
    .then(() => {
      return knex('messages').insert({
        user_id: messageObj.reciever_id,
        conversation_id: messageObj.convo_id,
        text: messageObj.message,
      })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err))
);

Messaging.getConvosChef = chefId => (
  knex.select('conversations.id as chatId', 'users.username as recipientUsername', 'users.id as recipientId').from('conversations').innerJoin('users', function combiner() {
    this.on('users.id', 'conversations.user_id');
  }).where('conversations.chef_id', chefId)
);

Messaging.getConvosClient = userId => (
  knex.select('conversations.id as chatId', 'users.username as recipientUsername', 'users.id as recipientId').from('conversations').innerJoin('users', function combiner() {
    this.on('users.id', 'conversations.chef_id');
  }).where('conversations.user_id', userId)
);

module.exports = Messaging;
