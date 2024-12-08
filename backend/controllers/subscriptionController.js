const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');

// Get Current Subscription
exports.getSubscription = async (req, res) => {
    const userId = req.user.id;

    try {
        const subscription = await Subscription.findByUserId(userId);
        if (!subscription) {
            return res.status(404).json({ error: 'No subscription found' });
        }

        res.status(200).json(subscription);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch subscription', details: err.message });
    }
};

// Update Subscription
exports.updateSubscription = async (req, res) => {
    const { plan_id, plan_name, expires_at } = req.body;
    const userId = req.user.id;

    console.log('Incoming Data:', { userId, plan_id, plan_name, expires_at }); // Debug log

    if (!plan_id || !plan_name || !expires_at) {
        console.error('Missing required fields:', { plan_id, plan_name, expires_at });
        return res.status(400).json({ error: 'Missing plan_id, plan_name, or expires_at' });
    }

    try {
        // Validate the plan_id exists in the database
        const plan = await Plan.getPlanById(plan_id);
        if (!plan) {
            console.error('Invalid plan_id:', plan_id);
            return res.status(400).json({ error: 'Invalid plan_id provided' });
        }

        // Proceed with the subscription update
        await Subscription.upsert(userId, plan_id, plan_name, expires_at);
        res.status(200).json({ message: 'Subscription updated successfully!' });
    } catch (err) {
        console.error('Error in updateSubscription:', err.message);
        res.status(500).json({ error: 'Failed to update subscription', details: err.message });
    }
};





