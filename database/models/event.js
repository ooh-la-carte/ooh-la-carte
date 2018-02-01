const knex = '../index.js';
const Event = {};

Event.findAllEvents = userId => (
  knex('events').where({ creator_id: userId }).then()
);

Event.insertUser = ({ hostId, date, location, partySize, meal, cuisine, description }) => (
  knex('events').insert({
    creator_id: hostId,
    party_size: partySize,
    address: location,
    cuisine_type: cuisine,
    date_type: date,
    meal_type: meal,
    description,
  }).then().catch(err => console.log('error inserting event into database: ', err))
);

module.exports = Event;
