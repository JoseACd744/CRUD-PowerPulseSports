const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.post('/products', ProductController.createProduct);
router.get('/products', ProductController.readProducts);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);


module.exports = router;