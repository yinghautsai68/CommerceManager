import express from "express";
import { createProduct, editProduct, getProduct, getProducts, deleteProduct, getLowStockProducts, getTopSellingProducts } from "./products.controller";
import { protect } from "../middleware/auth";
const router = express.Router();

router.post('/', protect(['admin']), createProduct);
router.get('/', getProducts);
router.get('/low-stock', getLowStockProducts);
router.get('/top-selling', getTopSellingProducts);

router.get('/:id', getProduct);
router.patch('/:id', editProduct);
router.delete('/:id', deleteProduct);

export default router;