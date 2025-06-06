const Question = require('../models/Question.js');
const { authenticate } = require('../middleware/auth.js');
const router = require('express').Router();

// GET / - Listar todas as dúvidas (Já estava correto)
router.get('/', authenticate, async (req, res) => {
    try {
        const questions = await Question.findAll();
        res.status(200).json(questions); 
    } catch (error) {
        console.error("Erro na rota GET /duvidas:", error);
        res.status(500).json({ message: 'Erro ao buscar as dúvidas.' });
        
    }
});

// GET /:id - Listar uma dúvida por ID (Já estava correto)
router.get('/:id', authenticate, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Dúvida não encontrada' });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar a dúvida' });
    }
});

// POST / - Criar uma nova dúvida
router.post('/', authenticate, async (req, res) => {
    const { title, content, categoryId } = req.body;
    const userId = req.user.id;
    
    if (!title || !content || !categoryId) {
        return res.status(400).json({ message: 'Título, conteúdo e ID da categoria são obrigatórios' });
    }
    
    try {
        const newQuestionData = {
            title,
            content,
            "user_id": userId,
            "category_id": categoryId,
        };
        
        // CORREÇÃO: Chamando o método 'create' do novo model
        const createdQuestion = await Question.create(newQuestionData);
        res.status(201).json(createdQuestion);

    } catch (error) {
        console.error("Erro ao criar dúvida:", error);
        res.status(500).json({ message: 'Erro ao criar a dúvida' });
    }
});

// PUT /:id - Atualizar uma dúvida
router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { title, content, categoryId } = req.body;
    const userId = req.user.id;

    try {
        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ message: 'Dúvida não encontrada' });
        }
        if (question.usuarioId !== userId) {
            return res.status(403).json({ message: 'Você não tem autorização para editar esta dúvida' });
        }
        if (!title || !content || !categoryId) {
            return res.status(400).json({ message: 'Título, conteúdo e ID da categoria são obrigatórios' });
        }
        
        const updatedQuestionData = { title, content, category_id: categoryId };
        
        // CORREÇÃO: Chamando o método 'update' do novo model
        const updatedQuestion = await Question.update(id, updatedQuestionData);
        res.status(200).json(updatedQuestion);

    } catch (error) {
        console.error("Erro ao atualizar dúvida:", error);
        res.status(500).json({ message: 'Erro ao atualizar a dúvida' });
    }
});

// DELETE /:id - Deletar uma dúvida
router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ message: 'Dúvida não encontrada' });
        }
        if (question.usuarioId !== userId) {
            return res.status(403).json({ message: 'Você não tem autorização para deletar esta dúvida' });
        }

        // CORREÇÃO: Chamando o método 'delete' do novo model
        await Question.delete(id);
        res.status(204).send(); // Resposta 204 (No Content) para sucesso na deleção

    } catch (error) {
        console.error("Erro ao deletar dúvida:", error);
        res.status(500).json({ message: 'Erro ao deletar a dúvida' });
    }
});

// PATCH /:id/resolver - Marcar uma dúvida como resolvida
router.patch('/:id/resolver', authenticate, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const question = await Question.findById(id);
        if(!question) {
            return res.status(404).json({ message: 'Dúvida não encontrada' });
        }
        if(question.usuarioId !== userId) {
            return res.status(403).json({ message: 'Você não tem autorização para resolver esta dúvida' });
        }

        // CORREÇÃO: Chamando o método 'resolve' do novo model
        const resolvedQuestion = await Question.resolve(id);
        res.status(200).json(resolvedQuestion);

    } catch(error) {
        console.error("Erro ao resolver dúvida:", error);
        return res.status(500).json({ message: 'Erro ao resolver a dúvida' });
    }
});


module.exports = router;