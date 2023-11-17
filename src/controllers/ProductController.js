const ModelProduct = require('../models/ProductModel');

const ModelComment = require('../models/CommentModel');


exports.createProduct = async (req, res) => {
    const body = req.body;
    body.image = req.file.filename; 
    const respuesta = await ModelProduct.create(body);
    //res.send(respuesta);
    res.redirect('/products');
};

exports.readProducts = async (req, res) => {
    const products = await ModelProduct.find().lean();
    //sesion usuario
    const user = req.session.user; // Obtén los datos del usuario de la sesión
   
    // Buscar los comentarios para cada producto
    for (let product of products) {
        product.comments = await ModelComment.find({ productId: product._id })
            .populate('userId', 'name') // Incluir los datos del usuario
            .lean();
    }
    res.render('products', { products: products, user: user }); // Pasa los datos del usuario a la vista
};

exports.renderNewProductForm = (req, res) => {
    res.render('newProduct');
};

exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const respuesta = await ModelProduct.findByIdAndUpdate(id, body);
    //res.send(respuesta);
    res.redirect('/products');
};

//rendereditar:
exports.renderEditProductForm = async (req, res) => {
    const id = req.params.id;
    const product = await ModelProduct.findById(id);
    res.render('editProduct', { product: product });
};

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelProduct.findByIdAndDelete(id);
    res.redirect('/products');
    //res.send(respuesta);
};