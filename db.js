import mongoose from 'mongoose';

const uri = 'mongodb://127.0.0.1:27017/hotel'; // Change as needed

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