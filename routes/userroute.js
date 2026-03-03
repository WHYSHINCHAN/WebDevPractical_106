const express = require('express');
const router = express.Router();


const userController = require('../controllers/usercontroller');
const { validateUser } = require('../middleware');

// RESTful routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateUser, userController.createUser);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
