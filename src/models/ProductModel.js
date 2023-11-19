const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        averageRating: { type: Number, default: 0 }, // Nuevo campo para la calificación promedio
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Agrega esta línea para la referencia al usuario  
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ModelProduct = mongoose.model('Product', productSchema);

module.exports = ModelProduct;
