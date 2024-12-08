const Credential = require('../models/Credential');
const { encrypt, decrypt } = require('../config/encryption');

// Add Credential
exports.addCredential = async (req, res) => {
    const { name, description, username, password, category } = req.body;
    const userId = req.user.id; // Extracted from auth middleware
    const createdBy = req.user.username; // Extracted from auth middleware

    if (!name || !description || !password) {
        return res.status(400).json({ error: 'Name, description, and password are required.' });
    }

    try {
        const encryptedPassword = encrypt(password);
        await Credential.create(userId, name, description, username, encryptedPassword, category, createdBy);
        res.status(201).json({ message: 'Credential added successfully!' });
    } catch (err) {
        console.error('Error adding credential:', err.message);
        res.status(500).json({ error: 'Failed to add credential' });
    }
};

exports.updateCredential = async (req, res) => {
    const { id } = req.params;
    const { name, description, username, password, category, createdBy } = req.body;
    const userId = req.user.id;
    const editedBy = req.user.username;

    try {
        const encryptedPassword = encrypt(password);
        const success = await Credential.updateByIdAndUserId(id, userId, { name, description, username, password: encryptedPassword, category, editedBy, createdBy });
        if (!success) {
            return res.status(404).json({ error: 'Credential not found' });
        }
        res.status(200).json({ message: 'Credential updated successfully!' });
    } catch (err) {
        console.error('Error updating credential:', err.message);
        res.status(500).json({ error: 'Failed to update credential' });
    }
};

exports.getAllCredentials = async (req, res) => {
    const userId = req.user.id;

    try {
        const credentials = await Credential.findAllByUserId(userId);
        const decryptedCredentials = credentials.map((credential) => ({
            ...credential,
            password: decrypt(credential.password),
        }));
        res.status(200).json(decryptedCredentials);
    } catch (err) {
        console.error('Error fetching credentials:', err.message);
        res.status(500).json({ error: 'Failed to fetch credentials' });
    }
};

// Delete Credential
exports.deleteCredential = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const success = await Credential.deleteByIdAndUserId(id, userId);
        if (!success) {
            return res.status(404).json({ error: 'Credential not found' });
        }

        res.status(200).json({ message: 'Credential deleted successfully!' });
    } catch (err) {
        console.error('Error deleting credential:', err.message);
        res.status(500).json({ error: 'Failed to delete credential', details: err.message });
    }
};

