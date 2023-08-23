import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

//Add user property to Express Request interface
declare global {
    namespace Express {
        interface Request {
            user?: { [key: string]: any };
        }
    }
}

const { PRIVATE_KEY } = process.env;


const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {

    //check for header and token existance
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return next(new Error('Access denied.'));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(new Error('Access denied.'));
    }

    try {
        // Verify the token and extract its payload
        const decoded = jwt.verify(token, PRIVATE_KEY as unknown as string) as { [key: string]: any };
        req.user = decoded; // Attach the decoded payload to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error((err as Error).message);
        next(new Error('Invalid token.')); // If token verification fails, deny access
    }
};

export default verifyJWT;
