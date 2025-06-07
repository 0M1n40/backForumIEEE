/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = knex => {
    
  return knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("name").notNullable();
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
    table.string("role").notNullable().defaultTo("user"); // user | admin
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/

const down = (knex) => {

    return knex.schema.dropTable("users");
};

module.exports = { up, down }