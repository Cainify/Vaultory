const express = require('express');
const { addCredential, getAllCredentials, deleteCredential, updateCredential } = require('../controllers/vaultController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addCredential);
router.get('/', authMiddleware, getAllCredentials);
router.delete('/:id', authMiddleware, deleteCredential);
router.put('/:id', authMiddleware, updateCredential);

module.exports = router;
