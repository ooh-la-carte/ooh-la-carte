const knex = require('../index');

const Event = {};

Event.findAllEvents = () => (
  knex('events').select((
    'id',
    'name',
    'party_size',
    'city',
    'state',
    'zip',
    'budget',
    'cuisine_type',
    'meal_type',
    'description',
    'requests')).then()
);


Event.insertEvent = (eventObj) => {
  const { eventName,
    hostId,
    city,
    stat,
    zip,
    month,
    date,
    year,
    cuisine,
    description,
    partySize,
    value } = eventObj;

  return knex('events').insert({
    name: eventName,
    creator_id: hostId,
    city,
    state: stat,
    zip_code: zip,
    date_time: (`${year}-${month}-${date} 00:00:00`),
    cuisine_type: cuisine,
    description,
    party_size: partySize,
    meal_type: value,
  })
    .then((insertResult) => {
      console.log('event sucessfully inserted');
      return insertResult;
    })
    .catch(err => console.log('error inserting event into database: ', err));
};

module.exports = Event;
