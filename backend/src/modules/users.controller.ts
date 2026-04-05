import { type Request, type Response } from "express";
import { createUserSchema, editUserSchema } from "./users.schema";
import { db } from "../config/db";

import bcrypt from 'bcrypt'
import { success } from "zod";

export const createUser = async (req: Request, res: Response) => {
    const result = createUserSchema.safeParse(req.body);
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
        res.status(201).json({ success: true, message: "user created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const role = req.query.role || "";
        const work = req.query.work || "";
        const status = req.query.status || "";

        const page = Number(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * 10

        const search = req.query.search || "";

        let query = "SELECT id, name, email, phone, role, work, status, created_at, updated_at FROM users ";
        let filters = [];
        let params = [];

        if (role) {
            filters.push("role = ?");
            params.push(role);
        }
        if (work) {
            filters.push("work = ?");
            params.push(work);
        }
        if (status) {
            filters.push("status = ?");
            params.push(status);
        }

        if (search) {
            filters.push("(name LIKE ? OR email LIKE ? OR phone LIKE ?)"),
                params.push(`%${search}%`, `${search}%`, `${search}%`)
        }

        let filterClause = "";
        if (filters.length > 0) {
            filterClause = `WHERE ${filters.join(" AND ")}`
        }

        query = query + filterClause + " LIMIT ? OFFSET ?";
        params.push(limit, offset)

        const [rows]: any = await db.query(query, params);



        //Page count
        let countQuery = `SELECT COUNT(*) AS total_users FROM users ${filterClause} `
        let countParams = params.slice(0, params.length - 2);
        const [countRows]: any = await db.query(countQuery, countParams);
        res.status(200).json({
            success: true,
            data: rows,
            totalUsers: countRows[0].total_users
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [rows]: any = await db.query('SELECT name, email, phone, role, work, status, created_at, updated_at FROM users where id =? ',
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
    const result = editUserSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: result.error });
    }
    try {
        const { name, email, phone, role, work, status } = result.data;

        const [updateResult]: any = await db.query(
            "UPDATE users SET name = ?, email = ?, phone = ?, role = ?, work = ?, status = ? WHERE id = ?",
            [name, email, phone, role, work, status, id]
        );

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User updated successfullys" });
    } catch (error) {
        console.log(error);
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
        res.status(200).json({ success: true, message: "User deleted successfully!" })
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
}