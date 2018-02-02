const knex = require('../index');

const Event = {};

Event.findAllEvents = () => (
  knex.select('*').table('events')
    .then((results) => {
      console.log(results);
      console.log('event:findall - all events queried');
      return results;
    })
    .catch((err) => { console.log(err); })
);

Event.findAllEventsByUserId = userId => (
  knex('events')
    .where({ creator_id: userId })
    .then((results) => {
      console.log('event:findByUserId - events by userId queried');
      return results;
    })
);

Event.findAllEventsByField = (field, target) => (
  knex('events')
    .where(field, target)
    .then((results) => {
      console.log('event:findByField - events by field queried');
      return results;
    })
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
      console.log('event:insert - event sucessfully inserted');
      return insertResult;
    })
    .catch(err => console.log('error inserting event into database: ', err));
};

module.exports = Event;
