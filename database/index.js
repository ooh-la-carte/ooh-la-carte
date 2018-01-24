// Initial Commit
const config = require('../config.js');

const knex = require('knex')({
  client: 'pb',
  connection: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    user: config.dbUser,
    password: process.env.DATABASE_PASSWORD || config.dbPass,
    database: process.env.DATABASE_NAME || 'thesis',
  },
});

module.exports = knex;
