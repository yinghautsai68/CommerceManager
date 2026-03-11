import type { Request, Response } from "express";
import { db } from "../config/db";

export const createOrder = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error!" });
    }
}

export const getOrders = async (req: Request, res: Response) => {
    try {
        const [rows]: any = await db.query('SELECT * FROM  orders');
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error!" });
    }
}
export const getOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "no id!" })
    }
    try {
        const [rows]: any = await db.query(
            "SELECT * FROM orders WHERE id = ?",
            [id]
        );
        res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error!" });
    }
}
export const editOrder = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error!" });
    }
}
export const deleteOrder = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error!" });
    }
}

export const getOrderItems = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "no id!" })
    }
    try {
        const [rows]: any = await db.query(
            "SELECT oi.id, oi.order_id, oi.product_id, oi.quantity, oi.discount, oi.sub_total, p.name, p.price, p.image_url FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?",
            [id]
        );
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error!" });
    }
}