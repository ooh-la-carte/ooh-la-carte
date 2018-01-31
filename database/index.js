const config = require('./config.js');
const knex = require('knex')(config);

knex.migrate.latest(config).then((v) => {
  if (v[1].length !== 0) {
    console.log('Performed db migration: ', v[1]);
  }
});

module.exports.knex = knex;
