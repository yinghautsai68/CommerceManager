import express from "express";
import { createProduct, editProduct, getProduct, getProducts, deleteProduct, getLowStockProducts, getTopSellingProducts } from "./products.controller";
const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/low-stock', getLowStockProducts);
router.get('/top-selling', getTopSellingProducts);

router.get('/:id', getProduct);
router.patch('/:id', editProduct);
router.delete('/:id', deleteProduct);

export default router;