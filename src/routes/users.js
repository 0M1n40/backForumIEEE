// routes/users.js
const router = require('express').Router();
const db = require('../db/knex.js'); // <-- CORREÇÃO: Importação do Knex adicionada.
const { authenticate } = require('../middleware/auth');
const User = require('../models/User');

/**
 * Rota para buscar um único usuário pelo seu ID.
 * É protegida e requer que o solicitante esteja autenticado.
 */
router.get('/:userId', authenticate, async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/batch', async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'Um array de IDs é obrigatório.' });
    }

    try {
        // Usa o método 'whereIn' do Knex para uma busca otimizada no banco.
        const users = await db('users')
            .whereIn('id', ids)
            .select('id', 'name', 'username'); // Seleciona apenas os dados públicos e necessários.
        
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários em lote.', error: error.message });
    }
});

module.exports = router;