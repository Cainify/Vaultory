module.exports = (requiredPlan) => (req, res, next) => {
    const userPlan = req.user.plan; // Assume decoded from JWT or fetched in middleware.
    if (userPlan !== requiredPlan && userPlan !== 'Business') {
        return res.status(403).json({ error: 'Access denied for your plan.' });
    }
    next();
};
