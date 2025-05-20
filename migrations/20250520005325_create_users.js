/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = knex => {
    
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
    table.string("role").notNullable().defaultTo("user"); // user | admin
  });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/

export const down = (knex) => {

    return knex.schema.dropTable("users");
};