const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Referencia al modelo Order para el pedido asociado al pago
  paymentMethod: { type: String, required: true }, // Método de pago utilizado (por ejemplo, tarjeta de crédito, PayPal, etc.)
  amount: { type: Number, required: true }, // Monto total del pago
  transactionId: { type: String, required: true }, // Identificador de la transacción proporcionado por el procesador de pagos
  paymentDate: { type: Date, default: Date.now }, // Fecha y hora de la transacción
});

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;
