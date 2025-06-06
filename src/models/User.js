const db = require("../db/knex.js");

const User = {
  /**
   * Cria um novo usuário.
   * @param {object} userData - Objeto com os dados do novo usuário.
   */
  async create(userData) {
    try {
      const [id] = await db("users").insert(userData);
      // Retorna o usuário recém-criado (sem a senha)
      return this.findById(id);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Encontra um usuário pelo seu ID (chave primária).
   * @param {string} id - O ID do usuário.
   */
  async findById(id) {
    return db("users")
      .where({ id })
      .select("id", "name", "username", "created_at")
      .first();
  },

  /**
   * Encontra um usuário pelo seu username (email). Inclui a senha para o processo de login.
   * @param {string} username - O email do usuário.
   */
  async findByUsername(username) {
    return db("users").where({ username }).first();
  },

  /**
   * Atualiza os dados de um usuário pelo seu ID.
   * @param {string} id - O ID do usuário a ser atualizado.
   * @param {object} dataToUpdate - Objeto com os campos a serem atualizados (ex: { name: "Novo Nome" }).
   */
  async update(id, dataToUpdate) {
    const count = await db("users").where({ id }).update(dataToUpdate);
    if (count === 0) {
      return null; // Nenhum usuário encontrado para atualizar
    }
    // Retorna o usuário com os dados atualizados para o frontend
    return this.findById(id);
  },

  /**
   * Deleta um usuário pelo seu ID.
   * @param {string} id - O ID do usuário a ser deletado.
   */
  async delete(id) {
    return db("users").where({ id }).del();
  },

  /**
   * Busca todos os usuários (sem a senha).
   */
  async findAll() {
    return db("users").select(
      "id",
      "name",
      "username",
      "created_at",
      "updated_at"
    );
  },
};

module.exports = User;
