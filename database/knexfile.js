// Update with your config settings.
// Update with your config settings.
const path = require('path');

module.exports = {
  devsqlite: { client: 'sqlite3' },
  development: {
    client: 'postgresql',
    connection: { database: 'chef_dev' },
    migrations: { tableName: 'knex_migrations' },
    seeds: { directory: path.join(__dirname, './seeds') },
  },
  testing: { client: 'postgresql' },
  production: { client: 'postgresql' },
};
