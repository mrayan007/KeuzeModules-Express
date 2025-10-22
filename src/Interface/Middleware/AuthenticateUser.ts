import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken"

interface IJWTPayload {
    id: string;
}

export default function AuthenticateUser(request: Request, response: Response, next: NextFunction) {
    try {
        const token = request.cookies.token;
        if (!token) throw new Error("User is not logged in, access denied.");

        const decodedToken = jwt.verify(token, process.env.JWT_KEY as string) as IJWTPayload;
        response.locals.userId = decodedToken.id;

        next();
    } catch (error: any) {
        response.status(401).send(error.message);
    }
}