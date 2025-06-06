const { v4 } = require("uuid");
const db = require("../db/knex.js");

const Category = {
  async create(categoryData) {
    try {
      const id = v4(); // Gera um ID único para a categoria

      await db("categories").insert({ id, ...categoryData });

      return db("categories").where({ id }).first();
    } catch (error) {
      // Re-lança o erro para ser capturado pelo 'catch' do controller.
      throw error;
    }
  },

  async findById(id) {
    return db("categories").where({ id }).first();
  },

  async findAll() {
    return db("categories").select("*").orderBy("description");
  },

  async update(id, categoryData) {
    const count = await db("categories").where({ id }).update(categoryData);
    return count > 0; // Retorna true se atualizou, false se não
  },

  async delete(id) {
    const count = await db("categories").where({ id }).del();
    return count > 0; // Retorna true se deletou, false se não
  },
};

module.exports = Category;
