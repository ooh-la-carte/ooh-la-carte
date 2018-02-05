const config = require('./config.js');
const knex = require('knex')(config);

knex.migrate.latest(config).then((v1) => {
  if (v1[1].length !== 0) {
    console.log('Performed db migration: ', v1[1]);
  }

  if (process.env.NODE_ENV === 'development' && v1[1].length !== 0) {
    knex.seed.run().then(v2 =>
      console.log('Seeded database with test data: ', v2))
      .catch(v2 => console.log('error seeing database', v2));
  }
});

module.exports = knex;
