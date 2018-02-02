const knex = '../index.js';
const Messaging = {};

Messaging.createConvo = () => (
  knex('conversations').insert().then()
);

Messaging.insertUser = ({ hostId, date, location, partySize, meal, cuisine, description }) => (
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

module.exports = Messaging;
