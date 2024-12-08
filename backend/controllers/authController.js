const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User Registration
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const userId = await User.create(username, email, hashedPassword);
        res.status(201).json({ message: 'User registered successfully!', userId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to register user', details: err.message });
    }
};

// User Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findByEmail(email);
        console.log('User Found:', user); // Debugging

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password_hash);
        console.log('Password Match:', isMatch); // Debugging

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log('Generated Token:', token); // Debugging

        res.status(200).json({
            token,
            user: { id: user.id, username: user.username, email: user.email },
        });
    } catch (err) {
        console.error('Login Error:', err.message); // Debugging
        res.status(500).json({ error: 'Failed to log in', details: err.message });
    }
};
