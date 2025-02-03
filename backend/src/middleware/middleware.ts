import jwt from 'jsonwebtoken';
import { Request, Response , NextFunction } from 'express';
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.SECRET;
if (!JWT_SECRET) {
  throw new Error("SECRET is missing in environment variables");
}

interface AuthRequest extends Request {
    userId?: string;
}

// @ts-ignore
export const middleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        console.log(token);


        if(!token){
            res.status(401).json({
                msg: "Access Denied. Token is not provided"
            });
            return;
        }

        const decode = jwt.verify(token, JWT_SECRET);
        console.log(decode);
        if (typeof decode === 'object' && decode !== null && 'userId' in decode) {
            req.userId = decode.userId;
            next();
        } else {
            res.status(401).json({ msg: "Invalid token structure" });
            return;
        }

    } catch(e) {
        console.error("Authentication error:", e);
        res.status(401).json({ msg: "Invalid or expired token" });
        return;
    }
}