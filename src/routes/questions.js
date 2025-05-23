import express from 'express'
import * as User from '../models/User.js'

/* Implementar Model de dúvidas
    import * as Question from '../models/Question.js'

    
*/

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'Rotas de Perguntas' });
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const question = await Question.findById(id)
        if (!question) {
            return res.status(404).json({ error: 'Question not found' })
        }
    }catch (error) {
        return res.status(500).json({ error: 'Error fetching question' })
    }

    res.json({ question })
})

export default router