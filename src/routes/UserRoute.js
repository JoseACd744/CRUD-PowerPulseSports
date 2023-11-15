const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/users', UserController.createUser);
router.get('/users', UserController.readUsers);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);


module.exports = router;