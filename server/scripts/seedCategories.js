import 'dotenv/config';
import mongoose from 'mongoose';
import Category from '../models/Category.js';

const defaultCategories = [
  { name: 'Motorsport', description: 'Posts about racing, cars, and motorsports' },
  { name: 'Tech News', description: 'Latest technology news and updates' },
  { name: 'Blogs', description: 'General blog posts and articles' },
  { name: 'Social Apps', description: 'Posts about social media and applications' },
];

const seedCategories = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_blog';
    await mongoose.connect(mongoUri, { 
      dbName: process.env.MONGO_DB || 'mern_blog'
    });
    console.log('MongoDB connected');

    const existingCategories = await Category.find({});
    
    if (existingCategories.length === 0) {
      console.log('Seeding default categories...');
      await Category.insertMany(defaultCategories);
      console.log('Default categories created successfully!');
      console.log('Created categories:', defaultCategories.map(c => c.name).join(', '));
    } else {
      // Check if any default categories are missing and add them
      const existingNames = existingCategories.map(cat => cat.name.toLowerCase());
      const missingCategories = defaultCategories.filter(
        cat => !existingNames.includes(cat.name.toLowerCase())
      );
      
      if (missingCategories.length > 0) {
        console.log(`Adding ${missingCategories.length} missing default categories...`);
        await Category.insertMany(missingCategories);
        console.log('Missing categories added successfully!');
        console.log('Added categories:', missingCategories.map(c => c.name).join(', '));
      } else {
        console.log('All default categories already exist.');
      }
    }

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error.message);
    process.exit(1);
  }
};

seedCategories();

