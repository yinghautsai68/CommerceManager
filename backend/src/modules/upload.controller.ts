import type { Request, Response } from "express";
import { success } from "zod";

export const uploadImage = async (req: Request, res: Response) => {
    try {
        const file = req.file as any;

        res.status(200).json({
            success: true,
            imageUrl: file.location
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error!" });
    }
}