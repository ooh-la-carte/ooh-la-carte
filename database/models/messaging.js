const knex = require('../index');

const Messaging = {};

Messaging.createConvo = convoObj => (
  knex('conversations').insert({
    user_id: convoObj.user,
    chef_id: convoObj.chef,
  })
    .then(() => knex('conversations').where({
      user_id: convoObj.user,
      chef_id: convoObj.chef,
    })).catch(err => console.log(err))
);

Messaging.getMessages = messageObj => (
  knex('messages').where({
    conversation_id: messageObj.id,
    user_id: messageObj.user,
  })
    .then(data => (
      data
    ))
    .catch(err => console.log(err))
);

Messaging.checkExisitingConvos = obj => (
  knex('conversations').where({
    user_id: obj.user_id,
    chef_id: obj.chef_id,
  })
    .then((results) => {
      if (results.length === 0) {
        const convo = obj;
        convo.dn = true;
        return convo;
      }
      return results;
    })
);


Messaging.insertMessage = messageObj => (
  knex('messages').insert({
    user_id: messageObj.sender,
    conversation_id: messageObj.convo_id,
    text: messageObj.text,
    self: true,
  })
    .then(() => {
      console.log('insert');
      return knex('messages').insert({
        user_id: messageObj.reciever_id,
        conversation_id: messageObj.convo_id,
        text: messageObj.text,
        self: false,
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
