const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Referencia al modelo Product para el producto en el carrito
  quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al modelo User para el usuario propietario del carrito
  items: [cartItemSchema], // Un arreglo de objetos que representan los productos en el carrito
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
