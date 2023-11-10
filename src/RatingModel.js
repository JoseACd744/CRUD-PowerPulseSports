const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al modelo User para el usuario que califica el producto
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Referencia al modelo Product para el producto calificado
  rating: { type: Number, required: true }, // El puntaje o calificación dada por el usuario
  createdAt: { type: Date, default: Date.now },
});

const RatingModel = mongoose.model('Rating', ratingSchema);

module.exports = RatingModel;
