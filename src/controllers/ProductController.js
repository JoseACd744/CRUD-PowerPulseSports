const ModelProduct = require('../models/ProductModel');

exports.createProduct = async (req, res) => {
    const body = req.body;
    const respuesta = await ModelProduct.create(body);
    res.send(respuesta);
};

exports.readProducts = async (req, res) => {
    const respuesta = await ModelProduct.find();
    res.send(respuesta);
};

exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await ModelProduct.findByIdAndUpdate(id, body);
    res.send(respuesta);
};

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelProduct.findByIdAndDelete(id);
    res.send(respuesta);
};