const express = require('express');
const router = express.Router();


const orderController = require('../controllers/ordercontroller');
const { validateOrder } = require('../middleware');

// RESTful routes
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', validateOrder, orderController.createOrder);
router.put('/:id', validateOrder, orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
