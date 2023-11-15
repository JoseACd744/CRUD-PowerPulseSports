const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.post('/users/:userId/carts', CartController.createCartForUser);
router.get('/users/:userId/carts', CartController.readCartsForUser);
router.put('/users/:userId/carts/:id', CartController.updateCartForUser);
router.delete('/users/:userId/carts/:id', CartController.deleteCartForUser);
router.post('/users/:userId/products/:productId/carts', CartController.createCartForUserWithProduct);
router.get('/users/:userId/products/:productId/carts', CartController.readCartsForProductByUser);
router.put('/users/:userId/products/:productId/carts/:id', CartController.updateCartForProductByUser);
router.delete('/users/:userId/products/:productId/carts/:id', CartController.deleteCartForProductByUser);

module.exports = router;