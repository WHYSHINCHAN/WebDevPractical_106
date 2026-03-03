// Fake in-memory data (for teaching)
let carts = [
  { id: 1, userId: 1, items: [{ productId: 1, quantity: 2 }], total: 2000 },
  { id: 2, userId: 2, items: [{ productId: 2, quantity: 1 }], total: 500 }
];

// GET /cart
exports.getAllCarts = (req, res) => {
  res.json(carts);
};

// GET /cart/:id
exports.getCartById = (req, res) => {
  const id = parseInt(req.params.id);
  const cart = carts.find(c => c.id === id);

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  res.json(cart);
};

// POST /cart
exports.createCart = (req, res) => {
  const newCart = {
    id: carts.length + 1,
    userId: req.body.userId,
    items: req.body.items || [],
    total: req.body.total || 0
  };

  carts.push(newCart);
  res.status(201).json(newCart);
};

// PUT /cart/:id
exports.updateCart = (req, res) => {
  const id = parseInt(req.params.id);
  const cart = carts.find(c => c.id === id);

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = req.body.items || cart.items;
  cart.total = req.body.total || cart.total;
  res.json(cart);
};

// DELETE /cart/:id
exports.deleteCart = (req, res) => {
  const id = parseInt(req.params.id);
  carts = carts.filter(c => c.id !== id);
  res.json({ message: 'Cart deleted' });
};
