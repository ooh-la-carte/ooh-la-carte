exports.up = (knex, Promise) => {
  Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').unsigned().primary();
      table.string('name', 63);
      table.string('username', 31).unique();
      table.string('password');
      table.string('email');
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    }),

    knex.schema.createTable('phone_numbers', (table) => {
      table.increments('id').unsigned().primary();
      table.string('number', 31);
      table.integer('user_id').unsigned().references('users.id');
    }),

    knex.schema.createTable('conversations', () => {

    }),

    knex.schema.createTable('events', () => {

    }),
  ]);
};

// exports.down = function(knex, Promise) {
//
// };
