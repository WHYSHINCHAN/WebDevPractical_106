const Order = require('../models/Order');

// GET /orders - Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('items.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /orders/:id - Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId').populate('items.productId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /orders - Create a new order
exports.createOrder = async (req, res) => {
  try {
    // Calculate total if items are provided
    const total = req.body.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const newOrder = new Order({
      userId: req.body.userId,
      items: req.body.items,
      total: total,
      status: req.body.status || 'pending',
      shippingAddress: req.body.shippingAddress
    });

    const savedOrder = await newOrder.save();
    await savedOrder.populate('userId').populate('items.productId');
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /orders/:id - Update an order
exports.updateOrder = async (req, res) => {
  try {
    // Calculate total if items are provided
    let total = req.body.total;
    if (req.body.items) {
      total = req.body.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        items: req.body.items,
        total: total,
        status: req.body.status,
        shippingAddress: req.body.shippingAddress
      },
      { new: true, runValidators: true }
    ).populate('userId').populate('items.productId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /orders/:id - Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
