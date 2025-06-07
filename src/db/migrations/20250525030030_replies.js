/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function(knex) {
    return knex.schema.createTable("replies", (table) => {
        table.uuid("id").primary().defaultTo(knex.fn.uuid());
        table.text("content").notNullable();
        table.uuid("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
        table.uuid("question_id").notNullable().references("id").inTable("questions").onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function(knex) {
    return knex.schema.dropTable("replies");
};

module.exports = { up, down };