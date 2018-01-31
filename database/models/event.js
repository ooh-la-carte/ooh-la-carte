const knex = '../index.js';
const Event = {};

Event.findAllEvents = userId => (
  knex('events').where({ creator_id: userId }).then()
);

Event.insertUser = () => (
  
);

module.exports = Event;
