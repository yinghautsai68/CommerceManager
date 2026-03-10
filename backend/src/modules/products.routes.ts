import express from "express";
import { createProduct, editProduct, getProduct, getProducts, deleteProduct } from "./products.controller";
const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.patch('/:id', editProduct);
router.delete('/:id', deleteProduct);

export default router;