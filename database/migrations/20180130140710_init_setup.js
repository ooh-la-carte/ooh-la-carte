
exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').unsigned().primary();
      table.boolean('is_chef').defaultTo(false);
      table.string('street_name');
      table.string('city');
      table.string('state');
      table.string('zip_code');
      table.string('name');
      table.string('username').unique().notNullable();
      table.string('phone');
      table.string('password').notNullable();
      table.string('cuisine');
      table.string('menu');
      table.string('img');
      table.string('availability');
      table.string('experience');
      table.string('price');
      table.string('bio');
      table.string('rating');
      table.string('email').unique().notNullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    }),
    knex.schema.createTable('conversations', (table) => {
      table.increments('id').unsigned().primary();
    }),
    knex.schema.createTable('chat_subscriber', (table) => {
      table.integer('user_id').unsigned().references('users.id');
      table.integer('conversation_id').unsigned().references('conversations.id');
    }),
    knex.schema.createTable('messages', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('user_id').unsigned().references('users.id');
      table.integer('conversation_id').unsigned().references('conversations.id');
      table.text('text');
    }),
    knex.schema.createTable('events', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('creator_id').unsigned().notNullable().references('users.id');
      table.integer('chef_id').unsigned().references('users.id');
      table.string('name');
      table.string('party_size').notNullable();
      table.string('street_name');
      table.string('city');
      table.string('state');
      table.string('zip_code');
      table.decimal('budget');
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
      table.decimal('price');
    }),
  ])
);


exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('conversations'),
    knex.schema.dropTable('chat_subscriber'),
    knex.scheam.dropTable('messages'),
    knex.schema.dropTable('events'),
    knex.schema.dropTable('menu'),
  ])
);
