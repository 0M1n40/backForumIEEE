import express from 'express'
import jwt from 'jsonwebtoken'
import * as User from '../models/User.js'

const router = express.Router()

// hello world route
router.get('/', (req, res) => {
    res.json({ message: 'Rotas de Conta' });
});

export default router