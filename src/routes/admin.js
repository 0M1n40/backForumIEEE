const router = require('express').Router();

const { authenticate, requireRole } = require('../middleware/auth.js');

router.get('/', authenticate, requireRole('admin'), (req, res) => {
    res.json({ message: 'Admin route accessed!' });
})

module.exports = router;