const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/public/image');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Agrega la fecha actual al nombre del archivo para evitar duplicados
    }
});

const upload = multer({ storage: storage });

router.get('/products', ProductController.readProducts);
router.get('/products/new', ProductController.renderNewProductForm);
router.get('/products/:id/edit', ProductController.renderEditProductForm);

router.post('/products', upload.single('image'), ProductController.createProduct);
//router.post('/products', ProductController.createProduct);
router.get('/products', ProductController.readProducts);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);


module.exports = router;