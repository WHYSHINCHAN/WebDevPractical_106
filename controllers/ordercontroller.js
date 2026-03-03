// Fake in-memory data (for teaching)
let orders = [
  { id: 1, userId: 1, items: [{ productId: 1, quantity: 2 }], total: 2000, status: 'pending' },
  { id: 2, userId: 2, items: [{ productId: 2, quantity: 1 }], total: 500, status: 'completed' }
];

// GET /orders
exports.getAllOrders = (req, res) => {
  res.json(orders);
};

// GET /orders/:id
exports.getOrderById = (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.json(order);
};

// POST /orders
exports.createOrder = (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    userId: req.body.userId,
    items: req.body.items,
    total: req.body.total,
    status: req.body.status || 'pending'
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
};

// PUT /orders/:id
exports.updateOrder = (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.items = req.body.items || order.items;
  order.total = req.body.total || order.total;
  order.status = req.body.status || order.status;
  res.json(order);
};

// DELETE /orders/:id
exports.deleteOrder = (req, res) => {
  const id = parseInt(req.params.id);
  orders = orders.filter(o => o.id !== id);
  res.json({ message: 'Order deleted' });
};
