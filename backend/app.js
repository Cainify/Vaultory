require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const vaultRoutes = require('./routes/vaultRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const statsRoutes = require('./routes/statsRoutes');

// Initialize the app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Log requests to the console
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/vault', vaultRoutes); // Vault management routes
app.use('/api/subscription', subscriptionRoutes); // Subscription management routes
app.use('/api/stats', statsRoutes); // Dashboard stats routes

// Test route
app.get('/', (req, res) => {
    res.send('Vaultory Backend is Running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Internal Server Error',
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});