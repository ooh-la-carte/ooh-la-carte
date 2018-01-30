exports.up = (knex, Promise) => {
  Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').unsigned().primary();
      table.boolean('is_chef').defaultTo(false);
      table.string('name');
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.string('email').unique().notNullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    }),

    knex.schema.createTable('phone_numbers', (table) => {
      table.increments('id').unsigned().primary();
      table.string('number').notNullable();
      table.integer('user_id').notNullable().references('users.id');
    }),

    knex.schema.createTable('conversation', (table) => {
      table.increments('id').unsigned().primary();
    }),

    knex.schema.createTable('chat_subscriber', (table) => {
      table.integer('user_id').references('users.id');
      table.integer('conversation_id').references('conversations.id');
    }),

    knex.schema.createTable('messages', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('conversation_id').unsigned().references('conversations.id');
      table.text('text');
    }),

    knex.schema.createTable('events', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('creator_id').unsigned().notNullable().references('users.id');
      table.integer('chef_id').unsigned().references('users.id');
      table.string('name');
      table.integer('party_size').unsigned().notNullable();
      table.string('address');
      table.decimal('budget', 2, 10);
      table.string('cuisine_type');
      table.timestamp('date_time');
      table.string('meal_type');
      table.text('description');
      table.text('requests');
    }),

    knex.schema.createTable('menu', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('chef_id').unsigned();
      table.string('pic');
      table.text('description');
      table.string('cuisine_type');
      table.decimal('price', 2, 10);
    }),
  ]);
};

// exports.down = function(knex, Promise) {
//
// };
