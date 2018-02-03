const User = require('../models/user.js');
const knex = require('../index.js');

exports.seed = (k, Promise) => {
  User.insertUser('user1', '1234', 'user1@example.com', false).then(() => {
    knex('users').where('username', 'user1').update({
      street_name: '1234 Loraxs Way',
      city: 'Whoville',
      state: 'CA',
      zip_code: '90002',
      name: 'The Cat',
      phone: '111-111-1111',
      img: '/img/11111111.png',
    }).then();
  });
  User.insertUser('user2', '1234', 'user2@example.com', false);
  User.insertUser('user3', '1234', 'user3@example.com', false);
  User.insertUser('user4', '1234', 'user4@example.com', false);
  User.insertUser('chef1', '1234', 'chef1@example.com', 'chef').then(() => (
    knex('users').where('username', 'chef1').update({
      street_name: '999 First Avalon Way',
      city: 'Austin',
      state: 'TX',
      zip_code: 78759,
      name: 'Gorden Ramsay',
      phone: '222-222-2222',
      cuisine: 'italian, french, british',
      menu: 'spaghetti, lasagna, other amazing things',
      img: '/img/22222222.png',
      availability: 'February 23, 2018',
      experience: '20 years of professional experience',
      rate: '5 Stars',
      bio: 'Gordon James Ramsay Jr is a British celebrity chef, restaurateur, and television personality. In July 2006, Ramsay won the Catey award for "Independent Restaurateur of the Year", becoming only the third person to have won three Catey awards.',
    })
  )).then(() => (
    knex('users').select('id').where('username', 'user1')
  )).then(v => (
    Promise.all([
      v[0],
      knex('users').select('id').where('username', 'chef1'),
    ])
  ))
    .then(v => (
      knex('events').insert({
        creator_id: v[0].id,
        creator_username: 'user1',
        chef_id: v[1][0].id,
        name: 'Gordon Ramsay',
        party_size: 5,
        street_name: '1010 Mulberry Street',
        city: 'Austin',
        state: 'TX',
        zip_code: '78701',
        budget: 10000.00,
        cuisine_type: 'italian',
        date_time: new Date(2018, 1, 24, 16, 40),
        meal_type: 'dinner',
        description: 'An intimate get-togther between good friends',
        img: '/img/event1.jpg',
      })
    ));

  User.insertUser('chef2', '1234', 'chef2@example.com', 'chef');
  User.insertUser('chef3', '1234', 'chef3@example.com', 'chef');
  User.insertUser('chef4', '1234', 'chef4@example.com', 'chef');
};

