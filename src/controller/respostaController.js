const respostaService = require("../services/respostaService");

async function handleCreateResposta(req, res) {
    try {
        const { descricao, duvida_id } = req.body;
        const usuario_id = req.id;

        if (!descricao || !duvida_id) {
            return res.status(400).json({ erro: "Campos obrigatórios: descricao e duvida_id" });
        }

        const resultado = await respostaService.createResposta({ descricao, duvida_id, usuario_id });

        if (typeof resultado === "string") {
            return res.status(201).json({ message: resultado });
        }

        return res.status(201).json(resultado);
    } catch (e) {
        if (e.message.includes("obrigatórios") || e.message.includes("não encontrada")) {
            return res.status(400).json({ erro: e.message });
        }
        console.error("Erro em handleCreateResposta:", e);
        return res.status(500).json({ erro: "Erro ao criar resposta" });
    }
}

async function handleReadRespostas(req, res) {
    try {
        const duvida_id = req.query.duvida_id;

	if(!duvida_id){
		return res.status(400).json({error:"Parâmetro duvida_id é obrigatório."});
	}

        const respostas = await respostaService.readRespostas(duvida_id);
        res.json(respostas);
    } catch (e) {
        console.error("Erro em handleReadRespostas:", e);
        res.status(500).json({ erro: "Erro ao buscar respostas" });
    }
}

async function handleUpdateResposta(req, res) {
    try {
        const { id } = req.params;
        const usuario_id = req.id;
        const { descricao } = req.body;

        if (!descricao) {
            return res.status(400).json({ erro: "Campo descricao é obrigatório." });
        }

        const resultado = await respostaService.updateResposta(id, usuario_id, { descricao });
        return res.status(200).json({ message: resultado });
    } catch (e) {
        if (e.message.includes("não encontrado") || e.message.includes("Campo")) {
            return res.status(400).json({ erro: e.message });
        }
        if (e.message.includes("não autorizado")) {
            return res.status(403).json({ erro: e.message });
        }
        console.error("Erro em handleUpdateResposta:", e);
        return res.status(500).json({ erro: "Erro ao atualizar resposta" });
    }
}

async function handleDeleteResposta(req, res) {
    try {
        const { id } = req.params;
        const usuario_id = req.id;

        const resultado = await respostaService.deleteResposta(id, usuario_id);
        return res.status(200).json({ message: resultado });
    } catch (e) {
        if (e.message.includes("não encontrada")) {
            return res.status(404).json({ erro: e.message });
        }
        if (e.message.includes("não autorizado")) {
            return res.status(403).json({ erro: e.message });
        }
        console.error("Erro em handleDeleteResposta:", e);
        return res.status(500).json({ erro: "Erro ao deletar resposta" });
    }
}

module.exports = {
    handleCreateResposta,
    handleReadRespostas,
    handleUpdateResposta,
    handleDeleteResposta
};
