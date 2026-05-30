import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Use MongoDB Atlas free tier or mock connection for local dev without MongoDB installed
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/data-analogy';
    
    // Check if we can connect, otherwise use in-memory fallback message
    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (localError) {
      console.warn('Local MongoDB not available. Using mock mode for development.');
      console.warn('To enable full functionality, please set MONGODB_URI to a MongoDB Atlas connection string.');
      console.warn('Get free MongoDB Atlas at: https://www.mongodb.com/cloud/atlas');
      
      // Create a mock connection object for development without database
      mongoose.connection.db = {
        collection: () => ({
          find: () => ({ toArray: () => Promise.resolve([]) }),
          findOne: () => Promise.resolve(null),
          insertOne: () => Promise.resolve({ insertedId: 'mock-id' }),
          updateOne: () => Promise.resolve({ modifiedCount: 1 }),
          deleteOne: () => Promise.resolve({ deletedCount: 1 }),
        }),
      };
      console.log('Mock database mode enabled - data will not persist');
    }
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    console.log('Running in offline mode. Some features may not work.');
  }
};

export default connectDB;
