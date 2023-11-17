const ModelComment = require('../models/CommentModel');

exports.createComment = async (req, res) => {
    const body = req.body;
    body.userId = req.session.user._id;
    const respuesta = await ModelComment.create(body);
    res.redirect('/products');
};

exports.deleteComment = async (req, res) => {
    const id = req.params.id;
    const user = req.session.user;

    // Solo permitir al usuario que creó el comentario eliminarlo
    const comment = await ModelComment.findById(id);
    if (comment.userId.toString() !== user._id.toString()) {
        return res.status(403).send('No tienes permiso para eliminar este comentario');
    }

    await ModelComment.findByIdAndDelete(id);
    res.redirect('/products');
};

exports.renderEditCommentForm = async (req, res) => {
    const id = req.params.id;
    const comment = await ModelComment.findById(id);
    if (comment.userId.toString() !== req.session.user._id.toString()) {
        return res.status(403).send('No tienes permiso para editar este comentario');
    }
    res.render('editComment', { comment: comment });
};

exports.updateComment = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const comment = await ModelComment.findById(id);
    if (comment.userId.toString() !== req.session.user._id.toString()) {
        return res.status(403).send('No tienes permiso para editar este comentario');
    }
    await ModelComment.findByIdAndUpdate(id, body);
    res.redirect('/products');
};


exports.createCommentForProductByUser = async (req, res) => {
    //const body = req.body;
    //body.productId = req.params.productId;
    //body.userId = req.params.userId;
    //const respuesta = await ModelComment.create(body);
    //res.send(respuesta);
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