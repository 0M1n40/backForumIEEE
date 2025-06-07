const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) 
        return res.status(401).json({ message: 'No token provided' })
    
    try{
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    }catch {
        return res.status(403).json({ message: 'Invalid token' })
    }
}

const requireRole = role => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Forbidden' })
    }
    next()
}

module.exports = {
    authenticate,
    requireRole
}