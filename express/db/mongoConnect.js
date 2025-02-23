const mongoose = require('mongoose');

// MongoDB connection string - store this in environment variables
//mongodb+srv://<db_username>:<db_password>@fourthrealm.adtxy.mongodb.net/?retryWrites=true&w=majority&appName=FourthRealm
const TEST_URI = "mongodb+srv://wwwrttt:tqbfj111@fourthrealm.adtxy.mongodb.net/recipe?retryWrites=true&w=majority&appName=FourthRealm";

const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
const mongoConnect = async () => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(TEST_URI, {
                useNewUrlParser: true
            });
            console.log('MongoDB connected successfully');
        }
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

// Export method
module.exports = mongoConnect;
