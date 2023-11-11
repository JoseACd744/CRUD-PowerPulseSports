const {Router} = require('express');

const router = Router();
const ModelUser = require('../UserModel.js');
const ModelProduct = require("../ProductModel.js");
const ModelComment = require("../CommentModel.js");
const OrderModel = require("../OrderModel.js");
const CartModel = require("../CartModel.js");
const RatingModel = require("../RatingModel.js");
const PaymentModel = require("../PaymentModel.js");

router.get('/',(req,res)=>{ res.render('index'); });

//CRUD USERS

//CREATE USER 
router.post('/users',async(req,res)=>
{ const body = req.body; 
    const respuesta = await ModelUser.create(body); 
    res.send(respuesta); 
});

//READ USERS 
router.get('/users',async(req,res)=>{
     const respuesta = await ModelUser.find();
    res.send(respuesta); 
});

//UPDATE USERS

router.put('/users/:id',async(req,res)=>
{ const id = req.params.id; 
    const body = req.body; 
    const respuesta = await ModelUser.findByIdAndUpdate(id,body); 
    res.send(respuesta); 
});

//DELETE USERS 
router.delete('/users/:id',async(req,res)=>
{ const id = req.params.id; 
    const respuesta = await ModelUser.findByIdAndDelete(id);
    res.send(respuesta); 
});

//CRUD PRODUCTS

// CREATE PRODUCT
router.post('/products', async(req, res) => {
    const body = req.body;
    const respuesta = await ModelProduct.create(body);
    res.send(respuesta);
});

// READ PRODUCTS
router.get('/products', async(req, res) => {
    const respuesta = await ModelProduct.find();
    res.send(respuesta);
});

// UPDATE PRODUCT
router.put('/products/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await ModelProduct.findByIdAndUpdate(id, body);
    res.send(respuesta);
});

// DELETE PRODUCT
router.delete('/products/:id', async(req, res) => {
    const id = req.params.id;
    const respuesta = await ModelProduct.findByIdAndDelete(id);
    res.send(respuesta);
});

// CREATE COMMENT FOR A PRODUCT
router.post('/products/:productId/comments', async(req, res) => {
    const body = req.body;
    body.productId = req.params.productId; // Asignamos el productId al cuerpo del comentario
    const respuesta = await ModelComment.create(body);
    res.send(respuesta);
});

// READ COMMENTS FOR A SPECIFIC PRODUCT
router.get('/products/:productId/comments', async(req, res) => {
    const respuesta = await ModelComment.find({ productId: req.params.productId });
    res.send(respuesta);
});

// UPDATE COMMENT FOR A PRODUCT
router.put('/products/:productId/comments/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await ModelComment.findByIdAndUpdate(id, body);
    res.send(respuesta);
});

// DELETE COMMENT FOR A PRODUCT
router.delete('/products/:productId/comments/:id', async(req, res) => {
    const id = req.params.id;
    const respuesta = await ModelComment.findByIdAndDelete(id);
    res.send(respuesta);
});

//CRUD COMMENTS

// CREATE COMMENT FOR A PRODUCT BY A USER
router.post('/users/:userId/products/:productId/comments', async(req, res) => {
    const body = req.body;
    body.productId = req.params.productId; // Asignamos el productId al cuerpo del comentario
    body.userId = req.params.userId; // Asignamos el userId al cuerpo del comentario
    const respuesta = await ModelComment.create(body);
    res.send(respuesta);
});

// READ COMMENTS FOR A SPECIFIC PRODUCT BY A USER
router.get('/users/:userId/products/:productId/comments', async(req, res) => {
    const respuesta = await ModelComment.find({ productId: req.params.productId, userId: req.params.userId });
    res.send(respuesta);
});

// UPDATE COMMENT FOR A PRODUCT BY A USER
router.put('/users/:userId/products/:productId/comments/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await ModelComment.findByIdAndUpdate(id, body);
    res.send(respuesta);
});

// DELETE COMMENT FOR A PRODUCT BY A USER
router.delete('/users/:userId/products/:productId/comments/:id', async(req, res) => {
    const id = req.params.id;
    const respuesta = await ModelComment.findByIdAndDelete(id);
    res.send(respuesta);
});


//CRUD ORDERS

// CREATE ORDER FOR A USER
router.post('/users/:userId/orders', async(req, res) => {
    const body = req.body;
    body.user = req.params.userId; // Asignamos el userId al cuerpo de la orden
    const respuesta = await OrderModel.create(body);
    res.send(respuesta);
});

// READ ORDERS FOR A SPECIFIC USER
router.get('/users/:userId/orders', async(req, res) => {
    const respuesta = await ModelOrder.find({ user: req.params.userId });
    res.send(respuesta);
});

// UPDATE ORDER FOR A USER
router.put('/users/:userId/orders/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await ModelOrder.findByIdAndUpdate(id, body);
    res.send(respuesta);
});

// DELETE ORDER FOR A USER
router.delete('/users/:userId/orders/:id', async(req, res) => {
    const id = req.params.id;
    const respuesta = await ModelOrder.findByIdAndDelete(id);
    res.send(respuesta);
});

// CREATE ORDER FOR A PRODUCT BY A USER
router.post('/users/:userId/products/:productId/orders', async(req, res) => {
    const body = req.body;
    body.user = req.params.userId; // Asignamos el userId al campo user de la orden
    body.products = [{ product: req.params.productId, quantity: body.quantity }]; // Asignamos el productId al campo product de la orden
    const respuesta = await OrderModel.create(body);
    res.send(respuesta);
});

// READ ORDERS FOR A SPECIFIC PRODUCT BY A USER
router.get('/users/:userId/products/:productId/orders', async(req, res) => {
    const respuesta = await OrderModel.find({ user: req.params.userId, 'products.product': req.params.productId });
    res.send(respuesta);
});

// UPDATE ORDER FOR A PRODUCT BY A USER
router.put('/users/:userId/products/:productId/orders/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await OrderModel.findByIdAndUpdate(id, body);
    res.send(respuesta);
});

// DELETE ORDER FOR A PRODUCT BY A USER
router.delete('/users/:userId/products/:productId/orders/:id', async(req, res) => {
    const id = req.params.id;
    const respuesta = await OrderModel.findByIdAndDelete(id);
    res.send(respuesta);
});


//CRUD CARTS

//CREATE CART

// CREATE CART FOR A USER
router.post('/users/:userId/carts', async(req, res) => {
    const body = req.body;
    body.user = req.params.userId; // Asignamos el userId al campo user del carrito
    const respuesta = await CartModel.create(body);
    res.send(respuesta);
});

// READ CARTS FOR A SPECIFIC USER
router.get('/users/:userId/carts', async(req, res) => {
    const respuesta = await CartModel.find({ userId: req.params.userId });
    res.send(respuesta);
});

// UPDATE CART FOR A USER
router.put('/users/:userId/carts/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await CartModel.findByIdAndUpdate(id, body);
    res.send(respuesta);
});

// DELETE CART FOR A USER
router.delete('/users/:userId/carts/:id', async(req, res) => {
    const id = req.params.id;
    const respuesta = await CartModel.findByIdAndDelete(id);
    res.send(respuesta);
});

// CREATE CART FOR A USER WITH A PRODUCT
router.post('/users/:userId/products/:productId/carts', async(req, res) => {
    const body = req.body;
    body.user = req.params.userId; // Asignamos el userId al campo user del carrito
    body.items = [{ product: req.params.productId, quantity: body.quantity }]; // Asignamos el productId al campo product del carrito
    const respuesta = await CartModel.create(body);
    res.send(respuesta);
});

// READ CARTS FOR A SPECIFIC PRODUCT BY A USER
router.get('/users/:userId/products/:productId/carts', async(req, res) => {
    const respuesta = await CartModel.find({ user: req.params.userId, 'items.product': req.params.productId });
    res.send(respuesta);
});

// UPDATE CART FOR A PRODUCT BY A USER
router.put('/users/:userId/products/:productId/carts/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await CartModel.findByIdAndUpdate(id, body);
    res.send(respuesta);
});

// DELETE CART FOR A PRODUCT BY A USER
router.delete('/users/:userId/products/:productId/carts/:id', async(req, res) => {
    const id = req.params.id;
    const respuesta = await CartModel.findByIdAndDelete(id);
    res.send(respuesta);
});

//CRUD RATINGS

// CREATE RATING FOR A PRODUCT BY A USER
router.post('/users/:userId/products/:productId/ratings', async(req, res) => {
    const body = req.body;
    body.productId = req.params.productId; // Asignamos el productId al cuerpo de la calificación
    body.userId = req.params.userId; // Asignamos el userId al cuerpo de la calificación
    const respuesta = await RatingModel.create(body);
    res.send(respuesta);
});

// READ RATINGS FOR A SPECIFIC PRODUCT BY A USER
router.get('/users/:userId/products/:productId/ratings', async(req, res) => {
    const respuesta = await RatingModel.find({ productId: req.params.productId, userId: req.params.userId });
    res.send(respuesta);
});

// UPDATE RATING FOR A PRODUCT BY A USER
router.put('/users/:userId/products/:productId/ratings/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await RatingModel.findByIdAndUpdate(id, body);
    res.send(respuesta);
});

// DELETE RATING FOR A PRODUCT BY A USER
router.delete('/users/:userId/products/:productId/ratings/:id', async(req, res) => {
    const id = req.params.id;
    const respuesta = await RatingModel.findByIdAndDelete(id);
    res.send(respuesta);
});


//CRUD PAYMENTS

// CREATE PAYMENT FOR A USER
router.post('/users/:userId/payments', async(req, res) => {
    const body = req.body;
    body.userId = req.params.userId; // Asignamos el userId al cuerpo del pago
    const respuesta = await PaymentModel.create(body);
    res.send(respuesta);
});

// READ PAYMENTS FOR A SPECIFIC USER
router.get('/users/:userId/payments', async(req, res) => {
    const respuesta = await PaymentModel.find({ userId: req.params.userId });
    res.send(respuesta);
});

// UPDATE PAYMENT FOR A USER
router.put('/users/:userId/payments/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await PaymentModel.findByIdAndUpdate(id, body);
    res.send(respuesta);
});

// DELETE PAYMENT FOR A USER
router.delete('/users/:userId/payments/:id', async(req, res) => {
    const id = req.params.id;
    const respuesta = await PaymentModel.findByIdAndDelete(id);
    res.send(respuesta);
});

// CREATE PAYMENT FOR AN ORDER BY A USER
router.post('/users/:userId/orders/:orderId/payments', async(req, res) => {
    const body = req.body;
    body.user = req.params.userId; // Asignamos el userId al campo user del pago
    body.order = req.params.orderId; // Asignamos el orderId al campo order del pago
    const respuesta = await PaymentModel.create(body);
    res.send(respuesta);
});

// READ PAYMENTS FOR A SPECIFIC ORDER BY A USER
router.get('/users/:userId/orders/:orderId/payments', async(req, res) => {
    const respuesta = await PaymentModel.find({ user: req.params.userId, order: req.params.orderId });
    res.send(respuesta);
});

// UPDATE PAYMENT FOR AN ORDER BY A USER
router.put('/users/:userId/orders/:orderId/payments/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await PaymentModel.findByIdAndUpdate(id, body);
    res.send(respuesta);
});

// DELETE PAYMENT FOR AN ORDER BY A USER
router.delete('/users/:userId/orders/:orderId/payments/:id', async(req, res) => {
    const id = req.params.id;
    const respuesta = await PaymentModel.findByIdAndDelete(id);
    res.send(respuesta);
});

//EXPORT ROUTER 
module.exports = router;