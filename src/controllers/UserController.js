const ModelUser = require('../models/UserModel');

exports.createUser = async (req, res) => {
    const body = req.body;

    // Verificar si el correo electrónico ya existe
    const existingUser = await ModelUser.findOne({ email: body.email });
    if (existingUser) {
        return res.status(400).send('Ya existe un usuario con este correo electrónico');
    }

    // Verificar si se proporcionaron todos los campos necesarios
    if (!body.email || !body.name) {
        return res.status(400).send('Faltan campos necesarios');
    }

    const respuesta = await ModelUser.create(body);
    res.send(respuesta);
};

exports.readUsers = async (req, res) => {
    const respuesta = await ModelUser.find();
    res.send(respuesta);
};

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    // Verificar si se proporcionaron todos los campos necesarios
    if (!body.email || !body.name) {
        return res.status(400).send('Faltan campos necesarios');
    }

    const respuesta = await ModelUser.findByIdAndUpdate(id, body);
    res.send(respuesta);
};

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelUser.findByIdAndDelete(id);
    res.send(respuesta);
};