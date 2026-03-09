import express from "express";
import cors from "cors";

import authRoutes from './modules/auth.routes';
import usersRoutes from './modules/users.routes';
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
    res.send("server running!");
})

app.listen(5000, () => {
    console.log("Server working!");
})