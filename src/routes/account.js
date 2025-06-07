const router = require('express').Router()

// hello world route
router.get('/', (req, res) => {
    res.json({ message: 'Rotas de Conta' });
});

module.exports = router