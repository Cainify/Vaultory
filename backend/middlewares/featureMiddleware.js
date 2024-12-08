module.exports = (requiredFeature) => async (req, res, next) => {
    const userPlan = req.user.plan; // Assume plan features are added in auth middleware
    if (!userPlan.features.includes(requiredFeature)) {
        return res.status(403).json({ error: `Access denied. Requires ${requiredFeature} feature.` });
    }
    next();
};
