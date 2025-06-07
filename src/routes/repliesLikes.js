const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const LikesReplies = require('../models/LikesReplies');
const Reply = require('../models/Reply');

router.get('/:replyId', async (req, res) => {
    const { replyId } = req.params;
    try {
        
        const likes = await LikesReplies.findById(replyId)

        if (!likes) {
            return res.status(200).json({ likes: 0 });
        }

        res.json({ likes });
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Error fetching likes for Reply' });
    }
});

router.get('/:replyId/user/:userId', authenticate, async(req, res) =>{
    const { replyId, userId } = req.params

    try{

        const isLiked = await LikesReplies.findByUserId(replyId, userId) ?
            1 : 0

        if(!isLiked)
            res.status(200).json({ liked: false })

        res.status(204).json({ liked: true })
    }catch(error){
        res.status(500).json({ error: error.message})
    }
})

router.post('/:replyId', authenticate, async (req, res) => {
    const { replyId } = req.params;

    const userId = req.user.id;

    const reply = await Reply.findById(replyId);

    if(!reply) 
        return res.status(404).json({ error: 'reply not found' });

    if(await LikesReplies.findById(replyId, userId))
        return res.status(400).json({ error: 'You have already liked this reply' });

    try{
        const like = await LikesReplies.createLike(replyId, userId);

        res.status(201).json(like);
    }catch(e){
        res.status(500).json({ error: e.message || 'Error creating like' });
    }
})

router.delete('/:replyId', authenticate, async (req, res) => {
    const { replyId } = req.params;
    const userId = req.user.id;

    if(!replyId) {
        return res.status(400).json({ error: 'Reply ID is required' });
    }

    try {
        const rowsAffected = await LikesReplies.deleteLike(replyId, userId);

        if (rowsAffected === 0) {
            return res.status(404).json({ error: 'Like not found' });
        }

        res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Error deleting like' });
    }
});

module.exports = router;