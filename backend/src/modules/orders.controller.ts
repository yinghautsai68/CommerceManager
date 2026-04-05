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

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const paymentStatus = req.query.paymentStatus || "";
        const shipmentStatus = req.query.shipmentStatus || "";
        const search = req.query.search || "";

        const offset = (page - 1) * limit;

        let query = "SELECT * FROM ORDERS";
        let filters = [];
        let params = [];


        if (paymentStatus) {
            filters.push("payment_status =?");
            params.push(paymentStatus);
        }

        if (shipmentStatus) {
            filters.push("shipment_status = ?");
            params.push(shipmentStatus);
        }

        if (search) {
            filters.push("(orders.customer_name LIKE ? OR orders.id LIKE ?)");

            params.push(`%${search}%`, `%${search}%`);
        }

        const whereClause = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";


        //query = `SELECT * FROM orders ${whereClause} LIMIT ? OFFSET ? `;
        query = `SELECT orders.*, SUM(order_items.quantity) AS total_items FROM orders LEFT JOIN order_items ON orders.id = order_items.order_id ${whereClause}  GROUP BY orders.id LIMIT ? OFFSET ? `
        params.push(limit, offset);

        //get order items


        const [rows]: any = await db.query(query, params);

        //Page COunt
        const countQuery = `SELECT COUNT(*) AS total_orders FROM orders ${whereClause}`;
        const countParams = params.slice(0, params.length - 2);
        const [countRows]: any = await db.query(countQuery, countParams);


        /*
        let query = "SELECT * FROM orders WHERE 1=1";
        let params = [];

        if (paymentStatus) {
            query += " AND  payment_status = ? ";
            params.push(paymentStatus);
        }
        if (shipmentStatus) {
            query += " AND shipment_status =?";
            params.push(shipmentStatus);
        }

        query += " LIMIT ? OFFSET ?";
        params.push(limit, offset);

        const [rows]: any = await db.query(query, params);

        let countQuery = "SELECT COUNT(*) AS total_orders FROM orders WHERE 1=1";
        let countParams = [];

        if (paymentStatus) {
            countQuery += " AND payment_status = ?";
            countParams.push(paymentStatus);
        }

        if (shipmentStatus) {
            countQuery += " AND shipment_status = ?";
            countParams.push(shipmentStatus);
        }


        const [countRows]: any = await db.query(countQuery, countParams);
        */

        /*
        const [rows]: any = await db.query(
            'SELECT * FROM  orders WHERE payment_status =? LIMIT ? OFFSET ? ',
            [paymentStatus, limit, offset]
 
        );
 
        const [countRows]: any = await db.query(
            "SELECT COUNT(*) AS total_orders FROM orders"
        );
        */
        res.status(200).json({ success: true, data: rows, total: countRows[0] });
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