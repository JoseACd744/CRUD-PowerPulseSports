const RatingModel = require('../models/RatingModel');

exports.createRatingForProductByUser = async (req, res) => {
    const body = req.body;
    body.productId = req.params.productId;
    body.userId = req.params.userId;
    const respuesta = await RatingModel.create(body);
    res.send(respuesta);
};

exports.readRatingsForProductByUser = async (req, res) => {
    const respuesta = await RatingModel.find({ productId: req.params.productId, userId: req.params.userId });
    res.send(respuesta);
};

exports.updateRatingForProductByUser = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await RatingModel.findByIdAndUpdate(id, body);
    res.send(respuesta);
};

exports.deleteRatingForProductByUser = async (req, res) => {
    const id = req.params.id;
    const respuesta = await RatingModel.findByIdAndDelete(id);
    res.send(respuesta);
};