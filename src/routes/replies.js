const Reply = require('../models/Reply.js')
const { authenticate } = require('../middleware/auth.js')

const router = require('express').Router();

router.get('/', async(req, res) => {
    try {
        const replies = await Reply.findAll()

        if(!replies)
            res.status(200).json([])

        res.json(replies)
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Error fetching replies' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const reply = await Reply.findById(id)
        if (!reply) 
            return res.status(200).json({ error: 'Reply not found' })
        
        res.json(reply)
    }catch (error) {
        return res.status(500).json({ error: error.message || 'Error fetching reply' })
    }
})

router.get('/duvida/:questionId', async (req, res) => {
    const { questionId } = req.params
    try {
        const replies = await Reply.findByQuestionId(questionId)
        if (!replies || replies.length === 0) 
            return res.status(200).json([])
        
        res.json(replies)
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Error fetching replies for question' })
    }
})

router.post('/', authenticate, async (req, res) => {
    
    const { content, questionId } = req.body
    const userId = req.user.id
    
    if (!content || !questionId) {
        return res.status(400).json({ error: 'Content and questionId are required' })
    }
    
    try {
        const newReply = {
            content,
            "question_id": questionId,
            "user_id": userId,
        }
        
        const reply = await Reply.createReply(newReply)
        res.status(201).json(reply)
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error creating reply' })
    }
})

router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params
    
    const userId = req.user.id

    const reply = await Reply.findById(id)
    if (!reply) {
        return res.status(404).json({ error: 'Reply not found' })
    }

    if (reply.userId !== userId) {
        return res.status(403).json({ error: 'You are not authorized to update this reply' })
    }

    try {
        const deleted = await Reply.deleteReply(id)

        if(!deleted) 
            return res.status(404).json({ error: 'Reply not found' })

        res.json({ message: 'Reply deleted successfully' })

    }catch(error){
        res.status(500).json({ error: error.message || 'Error deleting reply' })
    }
})

router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params
    const { content } = req.body
    
    const userId = req.user.id

    const reply = await Reply.findById(id)
    if (!reply) {
        return res.status(404).json({ error: 'Reply not found' })
    }

    if (reply.userId !== userId) {
        return res.status(403).json({ error: 'You are not authorized to update this reply' })
    }

    if (!content) {
        return res.status(400).json({ error: 'Content is required' })
    }

    try {
        const updatedReply = {
            content
        }
        const updated = await Reply.updateReply(id, updatedReply)
        
        if (!updated) 
            return res.status(404).json({ error: 'Reply not found' })
        
        return res.json(updatedReply)
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Error updating reply' })
    }
})

module.exports = router;