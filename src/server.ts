import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3001', 10);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api');

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});