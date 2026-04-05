import express from "express";
import { createProduct, editProduct, getProduct, getProducts, deleteProduct, getLowStockProducts, getTopSellingProducts } from "./products.controller";
import { protect } from "../middleware/auth";
const router = express.Router();

router.post('/', protect(["admin", "worker"]), createProduct);
router.get('/', getProducts);
router.get('/low-stock', protect(["admin", "worker"]), getLowStockProducts);
router.get('/top-selling', protect(["admin", "worker"]), getTopSellingProducts);

router.get('/:id', getProduct);
router.patch('/:id', protect(["admin", "worker"]), editProduct);
router.delete('/:id', protect(["admin"]), deleteProduct);

export default router;