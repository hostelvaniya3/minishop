const mongoose = require('mongoose');
require('dotenv').config();

const fixIndexes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    const hasUsers = collections.some(col => col.name === 'users');
    
    if (hasUsers) {
      console.log('Dropping stray indexes on users collection...');
      // Drop all indexes except the default _id index
      // Alternatively, just drop the specific 'username_1' index if it exists
      try {
        await mongoose.connection.db.collection('users').dropIndex('username_1');
        console.log('Successfully dropped username_1 index');
      } catch (e) {
        console.log('Index username_1 not found or already dropped');
      }
    }
    
    console.log('Database index cleanup complete.');
    process.exit(0);
  } catch (err) {
    console.error('Error during index cleanup:', err);
    process.exit(1);
  }
};

fixIndexes();
