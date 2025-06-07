const { v4 } = require('uuid');
const db = require('../db/knex.js');

const TABLE_NAME = 'categories';

const Category = {

    async create(categoryData) {

        const id = v4()

        try {
            await db(`${TABLE_NAME}`)
                .insert({ ...categoryData, id})

            return this.findById(id);

        } catch (error) {
            throw error;
        }
    },

    async findById(id) {
        return db(`${TABLE_NAME}`)
            .where({ id })
            .first();
    },

    async findAll() {
        return db(`${TABLE_NAME}`)
            .select('*')
            .orderBy('description');
    },

    async update(id, categoryData) {
        const count = await db(`${TABLE_NAME}`)
            .where({ id })
            .update(categoryData)

        return count > 0;
    },

    async delete(id) {
        const count = await db(`${TABLE_NAME}`)
            .where({ id })
            .del();

        return count > 0;
    }
};

module.exports = Category;