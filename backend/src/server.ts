import express from "express";
import cors from "cors";

import authRoutes from './modules/auth.routes';
import usersRoutes from './modules/users.routes';
import productRoutes from './modules/products.routes';
import orderRoutes from './modules/orders.routes';
import uploadRoutes from './modules/upload.routes';
import { db } from "./config/db";

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
    res.send("server running!");
})
app.get("/test-db", async (req, res) => {
    try {
        const [rows]: any = await db.query("SELECT NOW() AS now");
        res.json({ message: "DB connected!", serverTime: rows[0].now });
    } catch (error: any) {
        console.error("DB connection error:", error); // <-- check this in your terminal
        res.status(500).json({ message: "Failed to connect to DB", error: error.message });
    }
});

app.listen(5000, () => {
    console.log("Server workindsg!");
})