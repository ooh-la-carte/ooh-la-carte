// Initial Commit
const config = require('../config.js');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_HOST || '127.0.0.1',
    user : process.env.DATABASE_USER || config.dbUser,
    password : process.env.DATABASE_PASSWORD || config.dbPass,
    database : process.env.DATABASE_NAME ||  'thesis'
  }
});