/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const tables = [
        "questions_likes",
        "questions",
        "replies_likes",
        "replies",
        "users",
        "categories"
    ];

    return Promise.all(
        tables.map((tableName) =>
            knex.schema.alterTable(tableName, (table) => {
                table.timestamp("updated_at")
                    .defaultTo(knex.fn.now())
                    .alter()
                    .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            })
        )
    );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    const tables = [
        "questions_likes",
        "questions",
        "replies_likes",
        "replies",
        "users",
        "categories"
    ];

    return Promise.all(
        tables.map((tableName) =>
            knex.schema.alterTable(tableName, (table) => {
                table.timestamp("updated_at")
                    .defaultTo(knex.fn.now())
            })
        )
    );
};
