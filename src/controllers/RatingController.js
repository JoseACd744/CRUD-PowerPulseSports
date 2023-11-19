const RatingModel = require('../models/RatingModel');
const ProductModel = require('../models/ProductModel');

exports.createRatingForProductByUser = async (req, res) => {
    const { userId, productId } = req.params;
    const { rating } = req.body;

    // Verificar si el usuario ya ha calificado el producto
    const existingRating = await RatingModel.findOne({ user: userId, product: productId });

    if (existingRating) {
        // Si el usuario ya ha calificado el producto, puedes manejar esto según tus requisitos.
        // En este ejemplo, devolvemos un mensaje indicando que el usuario ya ha calificado el producto.
        return res.status(400).send('El usuario ya ha calificado este producto.');
    }

    // Crear una nueva calificación
    const newRating = await RatingModel.create({ user: userId, product: productId, rating });

    // Actualizar el promedio de calificación del producto
    await updateProductAverageRating(productId);

    res.send(newRating);
};

async function updateProductAverageRating(productId) {
    const ratings = await RatingModel.find({ product: productId });
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRating / ratings.length;

    await ProductModel.findByIdAndUpdate(productId, { averageRating });
}

// Resto del controlador...
