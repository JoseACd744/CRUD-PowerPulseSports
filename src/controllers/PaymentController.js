const PaymentModel = require('../models/PaymentModel');

exports.createPaymentForUser = async (req, res) => {
    const body = req.body;
    body.userId = req.params.userId;
    const respuesta = await PaymentModel.create(body);
    res.send(respuesta);
};

exports.readPaymentsForUser = async (req, res) => {
    const respuesta = await PaymentModel.find({ userId: req.params.userId });
    res.send(respuesta);
};

exports.updatePaymentForUser = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await PaymentModel.findByIdAndUpdate(id, body);
    res.send(respuesta);
};

exports.deletePaymentForUser = async (req, res) => {
    const id = req.params.id;
    const respuesta = await PaymentModel.findByIdAndDelete(id);
    res.send(respuesta);
};

exports.createPaymentForOrderByUser = async (req, res) => {
    const body = req.body;
    body.user = req.params.userId;
    body.order = req.params.orderId;
    const respuesta = await PaymentModel.create(body);
    res.send(respuesta);
};

exports.readPaymentsForOrderByUser = async (req, res) => {
    const respuesta = await PaymentModel.find({ user: req.params.userId, order: req.params.orderId });
    res.send(respuesta);
};

exports.updatePaymentForOrderByUser = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await PaymentModel.findByIdAndUpdate(id, body);
    res.send(respuesta);
};

exports.deletePaymentForOrderByUser = async (req, res) => {
    const id = req.params.id;
    const respuesta = await PaymentModel.findByIdAndDelete(id);
    res.send(respuesta);
};