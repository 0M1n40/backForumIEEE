require('dotenv').config();
const database = require("../database/exports");
const crypto = require("crypto");


async function createResposta(data) {
    const { descricao, duvida_id, usuario_id } = data;

    const id = crypto.randomUUID();

    await database("respostas").insert({
        id,
        descricao,
        duvida_id,
        usuario_id
    });

    return { id };
}


async function readRespostas(duvida_id) {
    const query = database("respostas")
        .select(
            "respostas.id",
            "respostas.descricao",
            "respostas.criado_em",
            "respostas.modificado_em",
            "usuarios.nome as autorNome"
        )
        .join("usuarios", "respostas.usuario_id", "usuarios.id")
        .where("respostas.duvida_id", duvida_id)
        .orderBy("respostas.criado_em", "asc");

    return await query;
}


async function updateResposta(id, descricao) {
    const updatedRows = await database("respostas")
        .where({ id })
        .update({
            descricao,
            modificado_em: database.fn.now()
        });

    return updatedRows > 0;
}


async function deleteResposta(id, usuarioAutenticadoId) {
    const resposta = await database("respostas").where({ id }).first();

    if (!resposta) {
        throw new Error("Resposta não encontrada.");
    }

    if (resposta.usuario_id !== usuarioAutenticadoId) {
        throw new Error("Usuário não autorizado a deletar esta resposta.");
    }

    await database("respostas").where({ id }).del();

    return { message: "Resposta deletada com sucesso." };
}

module.exports = {
    createResposta,
    readRespostas,
    updateResposta,
    deleteResposta, 
};
