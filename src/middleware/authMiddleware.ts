import jwt from "jsonwebtoken";
import { secretKey } from "../index";
import { type Response } from "express";

const authMiddleware =  (req: any, res: Response, next: any) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({message: "Authorization denied, no token provided"});    
    }
    
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, secretKey as string, (err: any, user: any) => {
            if (err) {
                return res.status(403).json({error: "Authorization failed"});
            } else {
                return user;
            }
        });
        req.user = decode;
        next();
    }
}

export default authMiddleware;