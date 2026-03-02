import { type Request, type Response } from "express";
import { registerSchema } from "./auth.schema";
import { db } from "../config/db";
import bcrypt from 'bcrypt';


export const register = async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: result.error.message });
    }
    try {
        const { username, password } = result.data;

        // Check username exist
        const [rows]: any = await db.execute(
            "SELECT id FROM users WHERE username = ?",
            [username]
        );
        if (rows.length > 0) {
            return res.status(400).json({ message: "Username already exists!" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Register
        await db.execute(
            "INSERT INTO users (username, password) VALUES (?,?)",
            [username, hashedPassword]
        );

        res.status(201).json({ message: "Registration success!" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

/*
export const register = async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: result.error.message });
    }
    try {

    } catch (error) {
        res.status(500).json({ message: error });
    }
}
    */