const Cart = require('../models/Cart');
const Product = require('../models/Product');

// GET /cart - Get all carts
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate('userId').populate('items.productId');
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /cart/:id - Get cart by ID
exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate('userId').populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /cart - Create a new cart
exports.createCart = async (req, res) => {
  try {
    const newCart = new Cart({
      userId: req.body.userId,
      items: req.body.items || [],
      total: req.body.total || 0
    });

    const savedCart = await newCart.save();
    await savedCart.populate('userId').populate('items.productId');
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /cart/:id - Update a cart
exports.updateCart = async (req, res) => {
  try {
    // Calculate total if items are provided
    let total = req.body.total;
    if (req.body.items) {
      total = req.body.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        items: req.body.items,
        total: total
      },
      { new: true, runValidators: true }
    ).populate('userId').populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /cart/:id - Delete a cart
exports.deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json({ message: 'Cart deleted', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
