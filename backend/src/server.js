import dbConnect from '../config/db.js';
import app from './app.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await dbConnect();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
