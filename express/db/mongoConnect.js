const mongoose = require('mongoose');

// MongoDB connection string - store this in environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
const mongoConnect = async () => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(MONGODB_URI, {});
            console.log('MongoDB connected successfully');
        }
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

// Export method
module.exports = mongoConnect;
