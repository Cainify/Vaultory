const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid or missing Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token);

    if (!token) {
        return res.status(401).json({ error: 'Malformed token header' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);

        req.user = decoded;

        const user = await User.findById(decoded.id);
        console.log('User Found:', user);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            console.error('Token expired');
            return res.status(401).json({ error: 'Token expired' });
        }
        console.error('Error in authMiddleware:', err.message);
        res.status(401).json({ error: 'Invalid token', details: err.message });
    }
};