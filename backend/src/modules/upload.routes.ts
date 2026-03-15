import express from "express";
import { upload } from "../middleware/upload";
import { uploadImage } from "./upload.controller";

const router = express.Router();

router.post("/", upload.single("image"), uploadImage);

export default router;