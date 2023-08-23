import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute';
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/', userRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
