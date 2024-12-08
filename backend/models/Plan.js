const pool = require('../config/db');

class Plan {
    /**
     * Fetch all plans from the database.
     * @returns {Promise<Array>} List of all plans.
     */
    static async getAllPlans() {
        const query = 'SELECT * FROM plans';
        try {
            const [rows] = await pool.query(query);
            return rows;
        } catch (err) {
            console.error('Error fetching all plans:', err.message);
            throw new Error('Database error while fetching plans');
        }
    }

    /**
     * Fetch a single plan by its ID.
     * @param {number} planId - The ID of the plan to fetch.
     * @returns {Promise<Object|null>} The plan or null if not found.
     */
    static async getPlanById(planId) {
        const query = 'SELECT * FROM plans WHERE plan_id = ?';
        try {
            const [rows] = await pool.query(query, [planId]);
            return rows[0] || null;
        } catch (err) {
            console.error(`Error fetching plan with ID ${planId}:`, err.message);
            throw new Error('Database error while fetching the plan');
        }
    }

    /**
     * Create or update a plan in the database.
     * @param {number} id - The ID of the plan.
     * @param {string} name - The name of the plan.
     * @param {number} price - The price of the plan.
     * @param {Array} features - The features of the plan.
     * @returns {Promise<void>}
     */
    static async upsertPlan(id, name, price, features) {
        const query = `
            INSERT INTO plans (plan_id, name, price, features)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            price = VALUES(price),
            features = VALUES(features)
        `;
        try {
            await pool.query(query, [id, name, price, JSON.stringify(features)]);
        } catch (err) {
            console.error(`Error upserting plan with ID ${id}:`, err.message);
            throw new Error('Database error while upserting the plan');
        }
    }

    /**
     * Delete a plan by its ID.
     * @param {number} planId - The ID of the plan to delete.
     * @returns {Promise<void>}
     */
    static async deletePlan(planId) {
        const query = 'DELETE FROM plans WHERE id = ?';
        try {
            await pool.query(query, [planId]);
        } catch (err) {
            console.error(`Error deleting plan with ID ${planId}:`, err.message);
            throw new Error('Database error while deleting the plan');
        }
    }
}

module.exports = Plan;