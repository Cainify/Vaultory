const Log = require('../models/Log');

// Create Log
exports.createLog = async (userId, action, details) => {
    try {
        await Log.create(userId, action, details);
    } catch (err) {
        console.error('Failed to create log:', err.message);
    }
};

// Fetch Logs
exports.getLogs = async (req, res) => {
    const userId = req.user.id;

    try {
        const logs = await Log.findAllByUserId(userId);
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch logs', details: err.message });
    }
};
