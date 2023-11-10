const mongoose = require('mongoose');

//create a schema for the user

const userSchema = new mongoose.Schema(
    {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String, required: true}
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

//export the model
const ModelUser = mongoose.model('User', userSchema);

module.exports = ModelUser;