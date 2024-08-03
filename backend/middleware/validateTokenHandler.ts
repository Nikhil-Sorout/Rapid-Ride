import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'
dotenv.config();

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    console.log('token validation begins....')
    const authHeader = await req.get('authorization');
    if (!authHeader) {
        res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader!.split(' ')[1];
    if (!token) {
        res.status(401).json({ messgae: "Token format is invalid" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: any, decoded: any) => {
        if (err) {
            res.status(401).json({ message: "Unauthorized access" });
        }
        // console.log(decoded);
        // req.user = decoded.user;
        console.log("token validated successfully....c")
        next();
    })


    // req.token = token;
}