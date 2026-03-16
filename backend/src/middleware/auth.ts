import type { NextFunction, Request, Response } from "express"
import { env } from "../config/env";

import jwt from "jsonwebtoken"

export const protect = (roles: string[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ message: "No authHeader provided" });
            }

            const token = authHeader.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "No token provided" });
            }


            const decoded: any = jwt.verify(token, env.JWT_SECRET);
            (req as any).user = decoded;
            // Safe role check outside try/catch
            if (roles.length > 0 && typeof decoded.role === "string" && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Access denied" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }

    }
}