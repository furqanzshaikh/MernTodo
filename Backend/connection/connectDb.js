const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDb