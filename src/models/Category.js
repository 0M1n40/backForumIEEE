const { v4 } = require('uuid');
const db = require('../db/knex.js'); // Verifique se o caminho está correto

// 1. Criamos um objeto principal para agrupar todas as funções.
const Category = {

    // 2. Definimos a função 'create' com o nome que a rota espera.
    // Usamos 'async/await' que é mais moderno e limpo que '.then()'.
    async create(categoryData) {
        try {
            const id = v4(); // Gera um ID único para a categoria

            /*
            agora retornou tudo pq a gente criou o id antes
            daquele jeito anterior, ele esperava que o proprio MySQL retornasse,
            porem o MySQL nao retorna, apenas o postgres
            */
            await db('categories').insert({ id, ...categoryData});
            
            return db('categories').where({ id }).first();
        } catch (error) {
            // Re-lança o erro para ser capturado pelo 'catch' do controller.
            throw error;
        }
    },

    async findById(id) {
        return db('categories').where({ id }).first();
    },

    async findAll() {
        return db('categories').select('*').orderBy('description');
    },

    async update(id, categoryData) {
        const count = await db('categories').where({ id }).update(categoryData);
        return count > 0; // Retorna true se atualizou, false se não
    },

    async delete(id) {
        const count = await db('categories').where({ id }).del();
        return count > 0; // Retorna true se deletou, false se não
    }
};

// 3. Exportamos o objeto 'Category' completo.
module.exports = Category;