const Question = require("../models/Question.js");
const { authenticate } = require("../middleware/auth.js");
const router = require("express").Router();

// GET / - Buscar todas as dúvidas ou pesquisar por título
router.get("/", async (req, res) => {
    const { titulo } = req.query;
    try {
      
        const questions = titulo 
            ? await Question.searchByTitle(titulo) 
            : await Question.findAll();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar as dúvidas.", error: error.message });
    }
});

// GET /:id - Buscar uma dúvida específica (rota protegida)
router.get("/:id", authenticate, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: "Dúvida não encontrada" });
        }
        // Resposta correta: envia o objeto da dúvida diretamente
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar a dúvida.", error: error.message });
    }
});

// POST / - Criar uma nova dúvida (rota protegida)
router.post("/", authenticate, async (req, res) => {
    const { title, content, categoryId } = req.body;
    const userId = req.user.id;

    if (!title || !content || !categoryId) {
        return res.status(400).json({ message: "Título, conteúdo e ID da categoria são obrigatórios" });
    }

    try {
        const newQuestionData = {
            title,
            content,
            user_id: userId,
            category_id: categoryId,
        };

        // MELHORIA: A função 'create' do model deve retornar o objeto recém-criado do banco
        const createdQuestion = await Question.create(newQuestionData);
        // Retorna o objeto completo que foi salvo no banco, incluindo ID e timestamps
        res.status(201).json(createdQuestion);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar a dúvida.", error: error.message });
    }
});

// PUT /:id - Atualizar uma dúvida (rota protegida)
router.put("/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const { title, content, categoryId } = req.body;
    const userId = req.user.id;

    try {
        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ message: "Dúvida não encontrada" });
        }
        
        // CORREÇÃO DE CONSISTÊNCIA: usar 'user_id' que é o padrão do banco
        if (question.user_id !== userId) {
            return res.status(403).json({ message: "Você não tem autorização para editar esta dúvida" });
        }
        
        // ... (validação de campos) ...

        const updatedQuestionData = { title, content, category_id: categoryId };
        const updatedQuestion = await Question.update(id, updatedQuestionData);
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar a dúvida.", error: error.message });
    }
});

// DELETE /:id - Deletar uma dúvida (rota protegida)
router.delete("/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ message: "Dúvida não encontrada" });
        }
        
        // CORREÇÃO DE CONSISTÊNCIA: usar 'user_id'
        if (question.user_id !== userId) {
            return res.status(403).json({ message: "Você não tem autorização para deletar esta dúvida" });
        }

        await Question.delete(id);
        // Status 204 (No Content) é a resposta padrão e correta para um DELETE bem-sucedido
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar a dúvida.", error: error.message });
    }
});

// PATCH /:id/resolver - Marcar uma dúvida como resolvida
router.patch("/:id/resolver", authenticate, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Dúvida não encontrada" });
    }
    if (question.usuarioId !== userId) {
      return res
        .status(403)
        .json({
          message: "Você não tem autorização para resolver esta dúvida",
        });
    }

    const resolvedQuestion = await Question.resolve(id);
    res.status(200).json(resolvedQuestion);
  } catch (error) {
    console.error("Erro ao resolver dúvida:", error);
    return res.status(500).json({ message: "Erro ao resolver a dúvida" });
  }
});

module.exports = router;
