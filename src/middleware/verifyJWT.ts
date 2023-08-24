import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Express Request interface to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: { [key: string]: any };
    }
  }
}

// Load the private key for JWT verification from environment variables
const { PRIVATE_KEY } = process.env;

// Middleware to verify JWT
const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Check for the presence of the Authorization header and extract the token
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw new Error('Access denied: Authorization header missing.');
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new Error('Access denied: Token not provided.');
    }

    // Verify the token and extract its payload
    const decoded = jwt.verify(token, PRIVATE_KEY as string) as { [key: string]: any };
    
    // Attach the decoded payload to the request object for further use
    req.user = decoded;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (err: any) {
    // Log the error message to the console
    console.error('JWT Verification Error:', err.message);
    
    // Deny access if token verification fails
    next(new Error('Access denied: Invalid token.'));
  }
};

export default verifyJWT;
