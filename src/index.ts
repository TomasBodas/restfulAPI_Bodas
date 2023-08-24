import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute';

// Load environment variables from the .env file
dotenv.config();

// Create an Express application instance
const app: Application = express();

// Define the port number for the server, using either the environment variable or a default value
const PORT = process.env.PORT || 3000;

// Apply middleware
app.use(cors());             // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json());    // Parse incoming JSON data

// Use the user route for handling user-related endpoints
app.use('/', userRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

