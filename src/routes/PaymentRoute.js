const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

router.post('/users/:userId/payments', PaymentController.createPaymentForUser);
router.get('/users/:userId/payments', PaymentController.readPaymentsForUser);
router.put('/users/:userId/payments/:id', PaymentController.updatePaymentForUser);
router.delete('/users/:userId/payments/:id', PaymentController.deletePaymentForUser);

router.post('/users/:userId/orders/:orderId/payments', PaymentController.createPaymentForOrderByUser);
router.get('/users/:userId/orders/:orderId/payments', PaymentController.readPaymentsForOrderByUser);
router.put('/users/:userId/orders/:orderId/payments/:id', PaymentController.updatePaymentForOrderByUser);
router.delete('/users/:userId/orders/:orderId/payments/:id', PaymentController.deletePaymentForOrderByUser);

module.exports = router;
``