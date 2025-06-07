/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable("questions_likes", (table) => {
        
        // A chave primária é uma combinação de question_id e user_id
        table.primary(["question_id", "user_id"]);

        table.uuid("question_id").notNullable();
        table.uuid("user_id").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    
        // Foreign key constraints
        table.foreign("question_id").references("id").inTable("questions").onDelete("CASCADE");
        table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
    
        // Unique constraint to prevent duplicate likes by the same user on the same question
        table.unique(["question_id", "user_id"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("questions_likes");
};
