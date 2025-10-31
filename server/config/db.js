import mongoose from 'mongoose';

const connectDb = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_blog';
  try {
    await mongoose.connect(mongoUri, { 
      dbName: process.env.MONGO_DB || 'mern_blog'
    });
    // eslint-disable-next-line no-console
    console.log('MongoDB connected');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDb;


