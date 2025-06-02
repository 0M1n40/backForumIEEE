const respostaService = require("../services/respostaService");

async function handleCreateResposta(req, res) {
    try {
        const { descricao, duvida_id } = req.body;
        const usuario_id = req.usuario_id; // vindo do authMiddleware

        if (!descricao || !duvida_id) {
            return res.status(400).json({ message: "Campos obrigatórios: descricao, duvida_id" });
        }

        const resposta = await respostaService.createResposta({ descricao, duvida_id, usuario_id });
        return res.status(201).json(resposta);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar resposta", error });
    }
}

async function handleReadRespostas(req, res) {
    try {
        const { duvida_id } = req.params;
        const respostas = await respostaService.readRespostas(duvida_id);
        return res.json(respostas);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar respostas", error });
    }
}

async function handleUpdateResposta(req, res) {
    try {
        const { id } = req.params;
        const { descricao } = req.body;

        if (!descricao) {
            return res.status(400).json({ message: "Campo descricao é obrigatório." });
        }

        const updated = await respostaService.updateResposta(id, descricao);
        if (!updated) {
            return res.status(404).json({ message: "Resposta não encontrada." });
        }

        return res.json({ message: "Resposta atualizada com sucesso." });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar resposta", error });
    }
}

async function handleDeleteResposta(req, res) {
    try {
        const { id } = req.params;
        const deleted = await respostaService.deleteResposta(id);

        if (!deleted) {
            return res.status(404).json({ message: "Resposta não encontrada." });
        }

        return res.json({ message: "Resposta deletada com sucesso." });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar resposta", error });
    }
}

module.exports = {
    handleCreateResposta,
    handleReadRespostas,
    handleUpdateResposta,
    handleDeleteResposta
};
