import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export default function AuthenticateUser(request: Request, response: Response, next: NextFunction) {
    try {
        const token = request.cookies.token;
        if (!token) throw new Error("User not logged in, access denied.");

        jwt.verify(token, process.env.JWT_KEY as string);
        next();
    } catch (error: any) {
        response.status(401).send(error.message);
    }
}