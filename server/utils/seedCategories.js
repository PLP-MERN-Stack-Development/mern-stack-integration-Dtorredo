import Category from '../models/Category.js';

const defaultCategories = [
  { name: 'Motorsport', description: 'Posts about racing, cars, and motorsports' },
  { name: 'Tech News', description: 'Latest technology news and updates' },
  { name: 'Blogs', description: 'General blog posts and articles' },
  { name: 'Social Apps', description: 'Posts about social media and applications' },
];

export const seedCategories = async () => {
  try {
    const existingCategories = await Category.find({});
    
    if (existingCategories.length === 0) {
      console.log('Seeding default categories...');
      await Category.insertMany(defaultCategories);
      console.log('Default categories created successfully!');
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
      }
    }
  } catch (error) {
    console.error('Error seeding categories:', error.message);
  }
};

