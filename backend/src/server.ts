import express from "express";
import cors from "cors";

import authRoutes from './modules/auth.routes';
import usersRoutes from './modules/users.routes';
import productRoutes from './modules/products.routes';
import orderRoutes from './modules/orders.routes';
import uploadRoutes from './modules/upload.routes';

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

app.listen(5000, () => {
    console.log("Server workindsg!");
})