import express from 'express';
import { getAverageOrderAmount, getLatestOrders, getOrder, getOrderItems, getOrders, getPendingShipmentOrders, getRevenueByDate, getTotalRevenue } from './orders.controller';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/', protect(), getOrders);
router.get('/latest', protect(["admin", "worker"]), getLatestOrders);

//KPI
router.get('/total-revenue', protect(["admin", "worker"]), getTotalRevenue);
router.get('/pending-shipment', protect(["admin", "worker"]), getPendingShipmentOrders);
router.get('/average-order-amount', protect(["admin", "worker"]), getAverageOrderAmount);
//Graph
router.get('/revenue-by-date', protect(["admin", "worker"]), getRevenueByDate);


router.get('/:id', protect(), getOrder);
router.get('/:id/items', protect(), getOrderItems)

export default router;