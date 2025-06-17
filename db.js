import mongoose from 'mongoose';
import 'dotenv/config';


// const uri = process.env.DB_URL_LOCAL; // Change as needed
const uri = process.env.DB_URL
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established successfully!');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected.');
});

mongoose.connect(uri)
  .catch(err => console.error('Initial MongoDB connection error:', err));

export default mongoose;