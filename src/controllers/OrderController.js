// src/controllers/OrderController.js
const OrderModel = require('../models/OrderModel');

exports.createOrder = async (req, res) => {
    const body = req.body;
    body.user = req.params.userId;
    const respuesta = await OrderModel.create(body);
    res.send(respuesta);
};

exports.getOrders = async (req, res) => {
    const respuesta = await OrderModel.find({ user: req.params.userId });
    res.send(respuesta);
};

exports.updateOrder = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await OrderModel.findByIdAndUpdate(id, body);
    res.send(respuesta);
};

exports.deleteOrder = async (req, res) => {
    const id = req.params.id;
    const respuesta = await OrderModel.findByIdAndDelete(id);
    res.send(respuesta);
};