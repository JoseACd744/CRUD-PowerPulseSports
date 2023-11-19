const ModelProduct = require('../models/ProductModel');
const ModelComment = require('../models/CommentModel');
const RatingModel = require('../models/RatingModel');
const fs = require('fs');
const path = require('path');

exports.createProduct = async (req, res) => {
    try {
        const body = req.body;
        body.image = req.file.filename; 
        body.userId = req.session.user._id;  // Almacena el ID del usuario
        const newProduct = await ModelProduct.create(body);
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.readProducts = async (req, res) => {
    try {
        const products = await ModelProduct.find().lean();
        const user = req.session.user;
        console.log('User:', user);

        for (let product of products) {
            product.comments = await ModelComment.find({ productId: product._id })
                .populate('userId', 'name')
                .lean();
        }

        res.render('products', { products: products, user: user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.renderNewProductForm = (req, res) => {
    res.render('newProduct');
};

// Función para manejar la actualización de un producto
exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const product = await ModelProduct.findById(id);

        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        // Solo actualiza los campos que se han enviado en el formulario
        if (body.name) {
            product.name = body.name;
        }

        if (body.description) {
            product.description = body.description;
        }

        if (req.file) {
            product.image = req.file.filename;
        }

        if (body.price) {
            product.price = body.price;
        }

        await product.save();

        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
};

exports.renderEditProductForm = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ModelProduct.findById(id);

        if (req.session.user && req.session.user._id.toString() === product.userId.toString()) {
            res.render('editProduct', { product: product });
        } else {
            res.status(403).send('No tienes permiso para editar este producto');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await ModelProduct.findById(id);

    if (req.session.user && req.session.user._id.toString() === product.userId.toString()) {
        // Obtener la ruta de la imagen
        const imagePath = path.join(__dirname, '../src/public/image', product.image);

        // Eliminar el producto de la base de datos
        await ModelProduct.findByIdAndDelete(id);

        // Eliminar físicamente la imagen del sistema de archivos
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error al eliminar la imagen:', err);
            } else {
                console.log('Imagen eliminada correctamente');
            }
        });

        res.redirect('/products');
    } else {
        res.status(403).send('No tienes permiso para eliminar este producto');
    }
};

exports.rateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;

        const product = await ModelProduct.findById(id);

        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        const newRating = await RatingModel.create({
            user: req.session.user._id,
            product: id,
            rating: rating
        });

        // Actualizar el promedio de calificación del producto
        await updateProductAverageRating(id);

        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al calificar el producto');
    }
};

async function updateProductAverageRating(productId) {
    const ratings = await RatingModel.find({ product: productId });
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRating / ratings.length;

    await ModelProduct.findByIdAndUpdate(productId, { averageRating });
}
