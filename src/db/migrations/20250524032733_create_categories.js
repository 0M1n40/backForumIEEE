/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function(knex) {
    return knex.schema.createTable("categories", (table) => {
        table.uuid("id").primary().defaultTo(knex.fn.uuid());
        table.string("description", 255).notNullable().unique().checkLength("<", 256);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function(knex) {
  return knex.schema.dropTable("categories");
};

module.exports = { up, down };
