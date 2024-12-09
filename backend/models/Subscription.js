const pool = require('../config/db');

class Subscription {
    // Find subscription by user ID and include plan details
    static async findByUserId(userId) {
        const query = `
            SELECT 
                s.*, 
                p.plan_id, 
                p.name AS plan_name, 
                p.features, 
                p.price 
            FROM subscriptions s
            LEFT JOIN plans p ON s.plan_id = p.plan_id
            WHERE s.user_id = ?`;
        const [rows] = await pool.query(query, [userId]);
    
        console.log('Query Result for User Subscription:', rows); // Debugging
        return rows[0] || null;
    }

    // Insert or update a subscription
    static async upsert(userId, plan_id, plan_name, expiresAt) {
        const formattedExpiresAt = new Date(expiresAt)
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ');
    
        const query = `
            INSERT INTO subscriptions (user_id, plan_id, plan_name, expires_at)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            plan_id = VALUES(plan_id),
            plan_name = VALUES(plan_name),
            expires_at = VALUES(expires_at)
        `;
    
        try {
            console.log('Formatted expires_at for query:', formattedExpiresAt);
            await pool.query(query, [userId, plan_id, plan_name, formattedExpiresAt]);
        } catch (err) {
            console.error('Database Error in upsert:', err.message);
            throw err;
        }
    }
    
    

    // Retrieve all available plans
    static async getAllPlans() {
        const query = 'SELECT * FROM plans';
        const [rows] = await pool.query(query);
        return rows;
    }
}

module.exports = Subscription;
