const pool = require('../config/db');

class Credential {
    static async create(userId, name, description, username, password, category, createdBy) {
        const query = `
            INSERT INTO credentials (user_id, name, description, username, password, category, created_by)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        try {
            const [result] = await pool.query(query, [userId, name, description, username, password, category, createdBy]);
            return result.insertId;
        } catch (err) {
            console.error('Database error during Credential.create:', err.message);
            throw new Error('Database error');
        }
    }

    static async updateByIdAndUserId(id, userId, updates) {
        const { name, description, username, password, category, editedBy } = updates;
        const query = `
            UPDATE credentials
            SET 
                name = ?, 
                description = ?, 
                username = ?, 
                password = COALESCE(?, password), 
                category = ?, 
                edited_by = ?, 
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ? AND user_id = ?
        `;
        try {
            const [result] = await pool.query(query, [name, description, username, password, category, editedBy, id, userId]);
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Database error during Credential.updateByIdAndUserId:', err.message);
            throw new Error('Database error');
        }
    }

    static async findAllByUserId(userId) {
        const query = `
            SELECT * FROM credentials WHERE user_id = ? ORDER BY created_at DESC
        `;
        try {
            const [rows] = await pool.query(query, [userId]);
            return rows;
        } catch (err) {
            console.error('Database error during Credential.findAllByUserId:', err.message);
            throw new Error('Database error');
        }
    }
    
    static async countByUserId(userId) {
        const query = `
            SELECT COUNT(*) AS total
            FROM credentials
            WHERE user_id = ?
        `;
        try {
            const [rows] = await pool.query(query, [userId]);
            return rows[0].total; // Return the total count
        } catch (err) {
            console.error('Database error during Credential.countByUserId:', err.message);
            throw new Error('Database error');
        }
    }
}

module.exports = Credential;
