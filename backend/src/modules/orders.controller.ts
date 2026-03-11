import type { Request, Response } from "express";
import { db } from "../config/db";
import { success } from "zod";

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

        if (rows.length === 0) {
            return res.status(404).json({ messaeg: "order not found!" })
        }
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


//OTHER CRUD

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

export const getLatestOrders = async (req: Request, res: Response) => {
    try {
        const [rows]: any = await db.query(
            "SELECT o.*, SUM(oi.quantity) AS total_items FROM orders o LEFT JOIN order_items AS oi ON o.id = oi.order_id GROUP BY o.id  ORDER BY order_date DESC LIMIT 10"
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: "no orders found!" });
        }

        res.status(200).json({ success: true, data: rows });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error!" });
    }
}


//KPI


export const getTotalRevenue = async (req: Request, res: Response) => {
    try {
        const [rows]: any = await db.query(
            "SELECT SUM(total_amount) AS total_revenue FROM orders WHERE payment_status = 'paid'"
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: "no orders found!" });
        }

        res.status(200).json({ success: true, data: rows[0] });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error!" });
    }
}

export const getAverageOrderAmount = async (req: Request, res: Response) => {
    try {
        const [rows]: any = await db.query(
            "SELECT SUM(total_amount)/COUNT(*) AS average_order_amount  FROM orders"
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: "no orders found!" });
        }

        res.status(200).json({ success: true, data: rows[0] });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error!" });
    }
}


export const getPendingShipmentOrders = async (req: Request, res: Response) => {
    try {
        const [rows]: any = await db.query(
            "SELECT COUNT(*) as total_pending_shipment_orders FROM orders WHERE shipment_status = 'pending' "
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: "no orders found!" });
        }

        res.status(200).json({ success: true, data: rows[0] });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error!" });
    }
}

//Graphs
export const getRevenueByDate = async (req: Request, res: Response) => {
    try {
        const [rows]: any = await db.query(
            "SELECT DATE_FORMAT(order_date, '%Y-%m-%d') AS date, SUM(total_amount) AS revenue FROM orders WHERE payment_status = 'paid' GROUP BY date ORDER BY date ASC "
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: "no orders found!" });
        }

        res.status(200).json({ success: true, data: rows });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error!" });
    }
}