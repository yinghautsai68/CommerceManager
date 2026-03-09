import { type Request, type Response } from "express";
import { userSchema } from "./users.schema";
import { db } from "../config/db";

import bcrypt from 'bcrypt'

export const createUser = async (req: Request, res: Response) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {

        return res.status(400).json({ error: result.error });
    }
    try {
        const { name, email, phone, role, work, status, password } = result.data;

        const [exist]: any = await db.execute(
            'SELECT * FROM users WHERE name =? OR email = ? OR phone = ? ',
            [name, email, phone]
        );
        if (exist.length > 0) {
            return res.status(400).json({ message: "name or email or phone already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            "INSERT INTO users (name, email, phone, role, work, status, password) VALUES (?,?,?,?,?,?,?)",
            [name, email, phone, role, work, status, hashedPassword]
        );
        res.status(201).json({ message: "user created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const [rows]: any = await db.execute('SELECT id, name, email, phone, role, work, status FROM users ');

        res.status(200).json(
            {
                success: true,
                data: rows
            }
        );
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [rows]: any = await db.query('SELECT name, email, phone, role, work, status FROM users where id =? ',
            [id]
        );
        console.log(rows);
        console.log(rows[0]);
        res.status(200).json(
            {
                success: true,
                data: rows[0]
            }
        );
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
}

export const editUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Missing user id" });
    }


    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: result.error });
    }
    try {
        const { name, email, phone, role, work, status, password } = result.data;

        const [updateResult]: any = await db.query(
            "UPDATE users SET name = ?, email = ?, phone = ?, role = ?, work = ?, status = ?, password = ? WHERE id = ?",
            [name, email, phone, role, work, status, password, id]
        );

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Missing user id" });
    }

    try {
        await db.query(
            "DELETE FROM users WHERE id =? ",
            [id]
        );
        res.status(200).json({ message: "User deleted successfully!" })
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
}