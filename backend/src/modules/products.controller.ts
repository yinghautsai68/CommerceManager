import type { Request, Response } from "express";
import { db } from "../config/db";
import { productSchema } from "./product.schema";
import { success } from "zod";


export const createProduct = async (req: Request, res: Response) => {
    const result = productSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: result.error });
    }
    try {
        const { sku, name, category, description, price, stock, status, image_url } = result.data;

        await db.query(
            'INSERT INTO products (sku, name , category ,description, price, stock, status, image_url) VALUES (?,?,?,?,?,?,?,?)',
            [sku, name, category, description, price, stock, status, image_url]
        );
        res.status(201).json({ success: true, message: "Created product successfully!" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
}

export const getProducts = async (req: Request, res: Response) => {

    try {
        const [rows]: any = await db.query("SELECT * FROM products");

        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}
export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "no id provided" });
    }
    try {
        const [rows]: any = await db.query(
            "SELECT * FROM products WHERE id = ? ",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found!" })
        }
        res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}


export const editProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "no id provided" });
    }
    const result = productSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: result.error });
    }
    try {
        const { sku, name, category, description, price, stock, status, image_url } = req.body;
        const [result]: any = await db.query(
            "UPDATE products SET sku = ?, name =?, category =?, description =?, price = ?, stock = ?, status=?, image_url= ? WHERE id = ?",
            [sku, name, category, description, price, stock, status, image_url, id]
        );
        res.status(200).json({ success: true, message: "Updated product successfully!" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "server error" })
    }
}


export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "no id provided" });
    }
    try {
        await db.query(
            "DELETE FROM products WHERE id = ?",
            [id]);
        res.status(200).json({ success: true, message: "Deleted product successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" })
    }
}

// others



export const getLowStockProducts = async (req: Request, res: Response) => {
    try {
        // mysql2/promise returns [rows, fields]
        const [rows]: any[] = await db.query(
            "SELECT * FROM products WHERE stock <= 60 ORDER BY stock ASC "
        );

        // rows should now contain an array of products
        res.status(200).json({
            success: true,
            data: rows
        });

    } catch (error) {
        console.error(error);
        // Always return a response on error
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getTopSellingProducts = async (req: Request, res: Response) => {
    try {
        const [rows]: any = await db.query(
            "SELECT p.*, SUM(oi.quantity) AS total_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id ORDER BY total_sold DESC LIMIT 5"
        );
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "no top selling products found!" });
        }

        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error!" });
    }
}

