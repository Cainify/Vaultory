const express = require('express');
const { getDashboardStats } = require('../controllers/statsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// This route handles GET requests to /api/stats
router.get('/', authMiddleware, getDashboardStats);

module.exports = router;
