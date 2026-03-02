import express from "express";
import { register } from "ts-node";

const router = express.Router();

router.post('/register', register);

export default router