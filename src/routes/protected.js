import express from 'express';

import { authenticate, requireRole } from '../middleware/auth.js';

const router = express.Router();

// router.get('/api', authenticate, (req, res) =>{
//     res.json({ message: 'Protected route accessed!' });
// })

router.get('/', authenticate, requireRole('admin'), (req, res) => {
    res.json({ message: 'Admin route accessed!' });
})

export default router;