const pool = require('../config/db');

class User {
    static async create(username, email, passwordHash) {
        const query = `
            INSERT INTO users (username, email, password_hash)
            VALUES (?, ?, ?)
        `;
        const [result] = await pool.query(query, [username, email, passwordHash]);
        return result.insertId; // Return the new user's ID
    }

    static async findByEmail(email) {
        const query = `SELECT * FROM users WHERE email = ?`;
        const [rows] = await pool.query(query, [email]);
        return rows[0] || null; // Return the user or null if not found
    }

    static async findById(id) {
        const query = `SELECT * FROM users WHERE id = ?`;
        const [rows] = await pool.query(query, [id]);
        return rows[0] || null; // Return the user or null if not found
    }
}

module.exports = User;
