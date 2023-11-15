// src/routes/OrderRoute.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.post('/users/:userId/orders', orderController.createOrder);
router.get('/users/:userId/orders', orderController.getOrders);
router.put('/users/:userId/orders/:id', orderController.updateOrder);
router.delete('/users/:userId/orders/:id', orderController.deleteOrder);

module.exports = router;