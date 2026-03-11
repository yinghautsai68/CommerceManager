import express from 'express';
import { getOrder, getOrderItems, getOrders } from './orders.controller';

const router = express.Router();

router.get('/', getOrders);
router.get('/:id', getOrder);
router.get('/:id/items', getOrderItems)
export default router;