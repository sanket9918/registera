import config from 'config';
import mongoose from 'mongoose';

export async function connectMongo() {
  try {
    await mongoose.connect(config.get('DBUrl'));
    console.log('Connected to MongoDB');
  } catch (error) {
    process.exit(1);
  }
}
