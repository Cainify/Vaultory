const express = require('express');
const { getSubscription, updateSubscription } = require('../controllers/subscriptionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getSubscription); // Ensure getSubscription is properly imported
router.put('/', authMiddleware, updateSubscription); // Ensure updateSubscription is properly imported

module.exports = router;
