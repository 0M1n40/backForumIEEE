const db = require('../db/knex.js');


const Question = {
    /**
     * Cria uma nova dúvida (Padrão para MySQL/SQLite)
     */
    async create(questionData) {
        try {
            // Passo 1: Insere os dados e pega o ID da nova linha.
            const [id] = await db('questions').insert(questionData);

            // Passo 2: Usa esse ID para buscar a dúvida completa com os JOINs.
            // A função 'this.findById' abaixo precisa estar 100% correta.
            const newQuestion = await this.findById(id);
            
            return newQuestion;
        } catch (error) {
            console.error("ERRO NO MODEL AO CRIAR DÚVIDA:", error);
            throw error; // Envia o erro detalhado para o controller
        }
    },

    /**
     * Busca UMA dúvida pelo ID, com os dados do autor e categoria.
     * ESTA FUNÇÃO PRECISA ESTAR CORRETA.
     */
    async findById(id) {
        return db('questions as q')
            .innerJoin('categories as c', 'q.category_id', 'c.id')
            .innerJoin('users as u', 'q.user_id', 'u.id')
            .where('q.id', id)
            .select(
                'q.id', 
                'q.title as titulo', 
                'q.content as descricao', 
                'q.created_at as dataPostagem',
                'q.user_id as usuarioId',
                'u.name as nomeUsuario', 
                'c.description as categoria'
            )
            .first();
    },

    /**
     * Busca TODAS as dúvidas, com os dados do autor e categoria.
     */
    async findAll() {
        return db('questions as q')
            .innerJoin('categories as c', 'q.category_id', 'c.id')
            .innerJoin('users as u', 'q.user_id', 'u.id')
            .select(
                'q.id', 'q.title as titulo', 'q.content as descricao',
                'q.created_at as dataPostagem', 'q.user_id as usuarioId',
                'u.name as nomeUsuario', 'c.description as categoria'
            )
            .orderBy('q.created_at', 'desc');
    },

    /**
     * Atualiza uma dúvida.
     */
    async update(id, questionData) {
        const count = await db('questions').where({ id }).update(questionData);
        if (count === 0) return null;
        return this.findById(id); // Retorna o dado atualizado
    },

    /**
     * Deleta uma dúvida.
     */
    async delete(id) {
        return db('questions').where({ id }).del();
    }
};

module.exports = Question;