import express from "express";
import { getMe, login, register } from "./auth.controller";
import { protect } from "../middleware/auth";


const router = express.Router();

router.post('/register', protect(["admin"]), register);
router.post('/login', login);
router.get('/me', getMe);
export default router;