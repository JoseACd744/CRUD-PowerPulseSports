const CartModel = require('../models/CartModel');

exports.createCartForUser = async (req, res) => {
    const body = req.body;

    // Verificar si se proporcionó el userId
    if (!req.params.userId) {
        return res.status(400).send('Falta el userId');
    }

    body.user = req.params.userId;
    const respuesta = await CartModel.create(body);
    res.send(respuesta);
};

exports.readCartsForUser = async (req, res) => {
    // Verificar si se proporcionó el userId
    if (!req.params.userId) {
        return res.status(400).send('Falta el userId');
    }

    const respuesta = await CartModel.find({ userId: req.params.userId });
    res.send(respuesta);
};

exports.updateCartForUser = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    // Verificar si se proporcionó el id del carrito
    if (!id) {
        return res.status(400).send('Falta el id del carrito');
    }

    const respuesta = await CartModel.findByIdAndUpdate(id, body);
    res.send(respuesta);
};

exports.deleteCartForUser = async (req, res) => {
    const id = req.params.id;

    // Verificar si se proporcionó el id del carrito
    if (!id) {
        return res.status(400).send('Falta el id del carrito');
    }

    const respuesta = await CartModel.findByIdAndDelete(id);
    res.send(respuesta);
};

exports.createCartForUserWithProduct = async (req, res) => {
    const body = req.body;

    // Verificar si se proporcionó el userId y el productId
    if (!req.params.userId || !req.params.productId) {
        return res.status(400).send('Faltan campos necesarios');
    }

    body.user = req.params.userId;
    body.items = [{ product: req.params.productId, quantity: body.quantity }];
    const respuesta = await CartModel.create(body);
    res.send(respuesta);
};

exports.readCartsForProductByUser = async (req, res) => {
    // Verificar si se proporcionó el userId y el productId
    if (!req.params.userId || !req.params.productId) {
        return res.status(400).send('Faltan campos necesarios');
    }

    const respuesta = await CartModel.find({ user: req.params.userId, 'items.product': req.params.productId });
    res.send(respuesta);
};

exports.updateCartForProductByUser = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    // Verificar si se proporcionó el id del carrito
    if (!id) {
        return res.status(400).send('Falta el id del carrito');
    }

    const respuesta = await CartModel.findByIdAndUpdate(id, body);
    res.send(respuesta);
};

exports.deleteCartForProductByUser = async (req, res) => {
    const id = req.params.id;

    // Verificar si se proporcionó el id del carrito
    if (!id) {
        return res.status(400).send('Falta el id del carrito');
    }

    const respuesta = await CartModel.findByIdAndDelete(id);
    res .send(respuesta);
}