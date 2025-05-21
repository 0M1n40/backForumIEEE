import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as User from '../models/User.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'API is working' });
});

router.post('/', (req, res) => {
    res.json({ message: 'API is working' });
});


router.get('/api', (req, res) => {
    res.json({ message: 'API is working' })
})

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await User.createUser({ username, password: hashedPassword, role })        
        res.status(201).json({ id: user.id, username: user.username, role: user.role })
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' })
    }

})

router.post('/login', async (req, res) => {

    const { username, password } = req.body
    
    try {
        const user = await User.findByUsername(username)
        if (!user)
            return res.status(401).json({ error: 'Invalid credentials' })

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) 
            return res.status(401).json({ error: 'Invalid credentials' })
        
        const token = jwt.sign(
            { id: user.id, role: user.role, username: user.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        )
        res.json({ token })
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' })
    }

})

export default router