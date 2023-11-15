const ModelComment = require('../models/CommentModel');

exports.createCommentForProductByUser = async (req, res) => {
    const body = req.body;
    body.productId = req.params.productId;
    body.userId = req.params.userId;
    const respuesta = await ModelComment.create(body);
    res.send(respuesta);
};

exports.readCommentsForProductByUser = async (req, res) => {
    const respuesta = await ModelComment.find({ productId: req.params.productId, userId: req.params.userId });
    res.send(respuesta);
};

exports.updateCommentForProductByUser = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await ModelComment.findByIdAndUpdate(id, body);
    res.send(respuesta);
};

exports.deleteCommentForProductByUser = async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelComment.findByIdAndDelete(id);
    res.send(respuesta);
};