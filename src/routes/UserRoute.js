const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', UserController.loginUser);

router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', UserController.createUser);

router.post('/users', UserController.createUser);
router.get('/users', UserController.readUsers);

router.get('/users/:id/edit', UserController.getUser); // Nueva ruta para mostrar el formulario de edición
router.put('/users/:id', UserController.updateUser); // Ruta actualizada para manejar la solicitud PUT
router.delete('/users/:id', UserController.deleteUser);


module.exports = router;