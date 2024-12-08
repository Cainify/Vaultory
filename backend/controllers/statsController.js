const Credential = require('../models/Credential');

exports.getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch stats
        const totalCredentials = await Credential.countByUserId(userId);

        res.status(200).json({
            totalCredentials
        });
    } catch (err) {
        console.error('Error retrieving stats:', err.message);
        res.status(500).json({ error: 'Failed to retrieve stats' });
    }
};
