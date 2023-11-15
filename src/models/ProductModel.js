const moongose = require('mongoose');

const productSchema = new moongose.Schema(
    {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: {type: String, required: true},
    price: {type: Number, required: true},
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const ModelProduct = moongose.model('Product', productSchema);

module.exports = ModelProduct;