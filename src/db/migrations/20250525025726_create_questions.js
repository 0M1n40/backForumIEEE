/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function(knex) {
  
    return knex.schema.createTable("questions", (table) => {
        table.uuid("id").primary().defaultTo(knex.fn.uuid());
        table.string("title").notNullable();
        table.text("content").notNullable();
        table.boolean("solved").notNullable().defaultTo(0);
        table.uuid("category_id").notNullable().references("id").inTable("categories").onDelete("CASCADE");
        table.uuid("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function(knex) {
    return knex.schema.dropTable("questions");
};

module.exports = { up, down };