const pool = require('../config/db');

class Log {
    static async create(userId, action, details) {
        const query = `
            INSERT INTO logs (user_id, action, details)
            VALUES (?, ?, ?)
        `;
        await pool.query(query, [userId, action, details]);
    }

    static async findAllByUserId(userId) {
        const query = `SELECT * FROM logs WHERE user_id = ? ORDER BY timestamp DESC`;
        const [rows] = await pool.query(query, [userId]);
        return rows;
    }
}

module.exports = Log;