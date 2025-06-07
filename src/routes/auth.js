const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const router = require('express').Router()

// Register route

router.post('/cadastro', async (req, res) => {
    
    const { name, username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = {
        name,
        username,
        password: hashedPassword,
        role: 'user', // Default role
    }

    try {
        
        await User.createUser(user)        
        res.status(201).json({ 
            user
        })

    } catch (error) {
        res.status(500).json({ error: error.message || 'Error creating user' })
    }

})

// Login route

router.post('/login', async (req, res) => {

    const { username, password } = req.body
    
    try {
        const user = await User.findByUsername(username)
        if (!user)
            return res.status(401).json({ error: 'User does not exist' })

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) 
            return res.status(401).json({ error: 'Invalid credentials' })
        
        const reqUser = {  
            id: user.id,
            role: user.role,
            username: user.username
        }

        const token = jwt.sign(
            reqUser, 
            process.env.JWT_SECRET, 
            { expiresIn: `${24 * 5}h` }
        )

        const { password: _, ...userSemSenha } = user;

        res.status(200).json({ token, user: userSemSenha })
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error logging in' })
    }

})

module.exports = router