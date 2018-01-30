const config = {
  client: process.env.DATABASE_ENGINE || 'postgresql',
  migrations: { tableName: 'knex_migrations' },
};

if (process.env.DATABASE_ENGINE === 'sqlite3') {
  config.connection = { filename: process.env.DATABASE_NAME };
} else {
  config.connection = {
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
  };
}

if (process.env.DATABASE_PASSWORD) {
  config.connection.password = process.env.DATABASE_PASSWORD;
}

if (process.env.DATABASE_USER) {
  config.connection.user = process.env.DATABASE_USER;
}
module.exports = config;
