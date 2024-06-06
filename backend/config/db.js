import mongoose from 'mongoose';
import 'dotenv/config';

const dbConnect = async () => {
  try {
    await mongoose.connect(`mongodb+srv://iscoa020:${process.env.DB_PASSWORD}@reporting.qicbunc.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default dbConnect;
