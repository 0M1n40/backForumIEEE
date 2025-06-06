// models/Question.js
const db = require("../db/knex.js");

// Query base reutilizável para evitar repetição de código
const baseQuery = () => db("questions as q")
    .innerJoin("categories as c", "q.category_id", "c.id")
    .innerJoin("users as u", "q.user_id", "u.id");

// Colunas selecionadas para garantir consistência
const selectedColumns = [
    "q.id",
    "q.title as titulo",
    "q.content as descricao",
    "q.created_at as dataPostagem",
    "q.user_id as usuarioId",
    "q.category_id as categoriaId", // <-- CORREÇÃO APLICADA
    "u.name as nomeUsuario",
    "c.description as categoria"
];

const Question = {
    async create(questionData) {
        try {
            const [id] = await db("questions").insert(questionData).returning('id');
            return this.findById(id);
        } catch (error) {
            console.error("ERRO NO MODEL AO CRIAR DÚVIDA:", error);
            throw error;
        }
    },

    async findById(id) {
        // Usa a query base, adiciona o filtro e seleciona as colunas padronizadas
        return baseQuery().where("q.id", id).select(selectedColumns).first();
    },

    async findAll() {
        return baseQuery().select(selectedColumns).orderBy("q.created_at", "desc");
    },

    async searchByTitle(titleTerm) {
        return baseQuery()
            .where("q.title", "like", `%${titleTerm}%`)
            .select(selectedColumns)
            .orderBy("q.created_at", "desc");
    },

    async update(id, questionData) {
        const count = await db("questions").where({ id }).update(questionData);
        if (count === 0) return null;
        return this.findById(id);
    },

    async delete(id) {
        return db("questions").where({ id }).del();
    },
};

module.exports = Question;