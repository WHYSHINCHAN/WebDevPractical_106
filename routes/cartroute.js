const express = require('express');
const router = express.Router();


const cartController = require('../controllers/cartcontroller');
const { validateCart } = require('../middleware');

// RESTful routes
router.get('/', cartController.getAllCarts);
router.get('/:id', cartController.getCartById);
router.post('/', validateCart, cartController.createCart);
router.put('/:id', validateCart, cartController.updateCart);
router.delete('/:id', cartController.deleteCart);

module.exports = router;
