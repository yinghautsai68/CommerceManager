import { type Request, type Response } from "express";
import { loginSchema, registerSchema } from "./auth.schema";
import { db } from "../config/db";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const register = async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error });
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


export const login = async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: result.error });
    }
    try {
        const { username, password } = result.data;

        // Checke username exist
        const [rows]: any = await db.execute(
            "SELECT id, password FROM users where username =?",
            [username]
        );
        if (rows === 0) {
            return res.status(400).json({ message: "username does not exists!" });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password!" });
        }

        // Generate Token
        const token = jwt.sign(
            { id: rows[0].id }, env.JWT_SECRET as string, { expiresIn: "1hr" }
        );

        res.status(200).json({ message: "Login successful!", token })
    } catch (error) {
        res.status(500).json({ message: error });
    }
}