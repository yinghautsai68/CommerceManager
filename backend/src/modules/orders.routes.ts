import express from 'express';
import { getAverageOrderAmount, getLatestOrders, getOrder, getOrderItems, getOrders, getPendingShipmentOrders, getRevenueByDate, getTotalRevenue } from './orders.controller';

const router = express.Router();

router.get('/', getOrders);
router.get('/latest', getLatestOrders);

//KPI
router.get('/pending-shipment', getPendingShipmentOrders);
router.get('/total-revenue', getTotalRevenue);
router.get('/average-order-amount', getAverageOrderAmount);
//Graph
router.get('/revenue-by-date', getRevenueByDate);


router.get('/:id', getOrder);
router.get('/:id/items', getOrderItems)

export default router;