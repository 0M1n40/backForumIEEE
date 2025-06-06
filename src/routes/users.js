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

module.exports = router