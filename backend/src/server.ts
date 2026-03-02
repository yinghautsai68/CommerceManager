import express from "express";
import cors from "cors";

import authRoutes from './modules/auth.routes';

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

app.listen(5000, () => {
    console.log("Server working!");
})