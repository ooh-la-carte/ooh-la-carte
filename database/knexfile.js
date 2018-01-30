// Update with your config settings.
// Update with your config settings.

module.exports = {
  devsqlite: { client: 'sqlite3' },
  development: {
    client: 'postgresql',
    connection: { database: 'chef_dev' },
    migrations: { tableName: 'knex_migrations' },
  },
  testing: { client: 'postgresql' },
  production: { client: 'postgresql' },
};
