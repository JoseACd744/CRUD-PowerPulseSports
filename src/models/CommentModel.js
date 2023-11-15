const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
    text: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const ModelComment = mongoose.model('Comment', commentSchema);

module.exports = ModelComment;