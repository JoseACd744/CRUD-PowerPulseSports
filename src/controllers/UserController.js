const ModelUser = require('../models/UserModel');

exports.createUser = async (req, res) => {
    const body = req.body;

    // Verificar si el correo electrónico ya existe
    const existingUser = await ModelUser.findOne({ email: body.email });
    if (existingUser) {
        return res.status(400).send('Ya existe un usuario con este correo electrónico');
    }

    // Verificar si se proporcionaron todos los campos necesarios
    if (!body.email || !body.name || !body.password) {
        return res.status(400).send('Faltan campos necesarios');
    }


    const respuesta = await ModelUser.create(body);
    //res.send(respuesta);
    res.redirect('/login');
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Buscar al usuario en la base de datos
    const user = await ModelUser.findOne({ email: email });
    if (!user) {
        return res.status(400).send('No existe un usuario con este correo electrónico');
    }

    // Comparar las contraseñas sin encriptar
    if (user.password !== password) {
        return res.status(400).send('Contraseña incorrecta');
    }

    // Inicio de sesión exitoso, redirige a la página de productos
    // Inicio de sesión exitoso, guarda los datos del usuario en la sesión
    req.session.user = user;
    res.redirect('/products');
   
};


exports.readUsers = async (req, res) => {
    try {
        const users = await ModelUser.find();
        res.render('users', { users: users });
    } catch (err) {
        res.status(500).send(err);
    }
   
};

//actualizar usuario

exports.getUser = async (req, res) => {
    const id = req.params.id;
    const user = await ModelUser.findById(id);
    res.render('editUser', { user });
};

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    await ModelUser.findByIdAndUpdate(id, req.body);
    res.redirect('/users');
};

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelUser.findByIdAndDelete(id);
    res.redirect('/users');
    //res.send(respuesta);
};