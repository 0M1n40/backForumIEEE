const { authenticate } = require('../middleware/auth')
const User = require('../models/User')
const router = require('express').Router()

router.get('/:userId', authenticate, async (req, res) => {

    const {userId} = req.params

    try{

        const user = await User.findById(userId)

        if(!user)
            return res.status(404).json({ error: 'not found'})

        return res.status(200).json(user)

    }catch(error){
        res.status(500).json({ error: error.message })
    }

})

router.get('/', async (req, res) => {
    try{

        const users = await User.findAll()

        if(!users)
            res.status(404).json({ error: 'No users found' })

        return res.status(200).json(users)

    }catch(error){
        res.status(500).json({ error: error.message })
    }
})

router.post('/batch', async (req, res) => {
    try{

        const { ids } = req.body

        const users = await User.findByIds(ids)

        if(!users)
            res.status(404).json([])

        return res.status(200).json(users)

    }catch(error){
        res.status(500).json({ error: error.message })
    }
})

module.exports = router