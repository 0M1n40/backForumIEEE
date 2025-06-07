const Question = require('../models/Question.js')
const { authenticate } = require('../middleware/auth.js')

const router = require('express').Router();

router.get('/', async (req, res) => {
    try{
        const questions = await Question.findAll()

        if(!questions)
            res.status(200).json([])

        res.json(questions)
    }catch (error) {
        return res.status(500).json({ error: error.message || 'Error fetching questions' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const question = await Question.findById(id)
        
        if (!question) 
            return res.status(200).json({ error: 'Question not found' })
        
        res.json(question)
    }catch (error) {
        return res.status(500).json({ error: error.message || 'Error fetching question' })
    }
    
})

router.patch('/:id/resolver', authenticate, async (req, res) => {
    const { id } = req.params

    const userId = req.user.id
    
    const question = await Question.findById(id)

    if(!question) {
        return res.status(404).json({ error: 'Question not found' })
    }

    if(question.userId !== userId) {
        return res.status(403).json({ error: 'You are not authorized to resolve this question' })
    }

    try{

        const resolvedQuestion = await Question.resolveQuestion(id)
        
        if (!resolvedQuestion) 
            return res.status(404).json({ error: 'Question not found' })
        
        res.json(resolvedQuestion)

    }catch(error) {
        return res.status(500).json({ error: error.message || 'Error resolving question' })
    }

})

router.post('/', authenticate, async (req, res) => {
    
    const { title, content, categoryId } = req.body
    const userId = req.user.id
    
    if (!title || !content || !categoryId) {
        return res.status(400).json({ error: 'Title and content are required' })
    }
    
    try {
        const newQuestion = {
            title,
            content,
            "user_id": userId,
            "category_id": categoryId,
        }
        
        const question = await Question.createQuestion(newQuestion)
        res.status(201).json(question)
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error creating question' })
    }
})

router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params
    
    const userId = req.user.id

    const question = await Question.findById(id)

    if(!question)
        return res.status(404).json({ error: 'Question not found' })

    if(question.userId !== userId) {
        return res.status(403).json({ error: 'You are not authorized to update this question' })
    }

    try {
        const deleted = await Question.deleteQuestion(id)
        
        if (!deleted) 
            return res.status(404).json({ error: 'Question not found' })
        
        return res.json({ message: 'Question deleted successfully' })
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Error deleting question' })
    }
})

router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params
    const { title, content, categoryId } = req.body
    
    const userId = req.user.id

    const question = await Question.findById(id)

    if(!question) {
        return res.status(404).json({ error: 'Question not found' })
    }

    if(question.userId !== userId) {
        return res.status(403).json({ error: 'You are not authorized to update this question' })
    }

    if (!title || !content || !categoryId) {
        return res.status(400).json({ error: 'Title, content and categoryId are required' })
    }
    
    try {
        const updatedQuestion = {
            title,
            content,
            "category_id": categoryId,
        }
        
        const updated = await Question.updateQuestion(id, updatedQuestion)
        
        if (!updated) 
            return res.status(404).json({ error: 'Question not found' })
        
        return res.json(updatedQuestion)
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Error updating question' })
    }
})

module.exports = router