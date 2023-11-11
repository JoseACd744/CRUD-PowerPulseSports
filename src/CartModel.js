const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Referencia al modelo Product para el producto en el carrito
  quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al modelo User para el usuario propietario del carrito
  items: [cartItemSchema], // Un arreglo de objetos que representan los productos en el carrito
  totalAmount: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

cartSchema.pre('save', async function(next) {
  let total = 0;

  for (let i = 0; i < this.items.length; i++) {
    const item = this.items[i];
    // Asumiendo que tienes un modelo de producto y puedes buscar el producto por su id
    const product = await mongoose.model('Product').findById(item.product);
    total += product.price * item.quantity;
  }

  this.totalAmount = total;

  next();
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;