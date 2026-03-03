function validateUser(req, res, next) {
  const { name, email } = req.body;
  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required and must be a string.' });
  }
  if (typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }
  next();
}

function validateStudent(req, res, next) {
  const { name } = req.body;
  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required and must be a string.' });
  }
  next();
}

function validateProduct(req, res, next) {
  const { name, price } = req.body;
  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required and must be a string.' });
  }
  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'Price must be a non-negative number.' });
  }
  next();
}

function validateCart(req, res, next) {
  const { userId, items, total } = req.body;
  if (typeof userId !== 'number') {
    return res.status(400).json({ error: 'userId must be a number.' });
  }
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'items must be an array.' });
  }
  if (typeof total !== 'number' || total < 0) {
    return res.status(400).json({ error: 'total must be a non-negative number.' });
  }
  next();
}

function validateOrder(req, res, next) {
  const { userId, items, total } = req.body;
  if (typeof userId !== 'number') {
    return res.status(400).json({ error: 'userId must be a number.' });
  }
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'items must be an array.' });
  }
  if (typeof total !== 'number' || total < 0) {
    return res.status(400).json({ error: 'total must be a non-negative number.' });
  }
  next();
}

// Central error handler
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = {
  validateUser,
  validateStudent,
  validateProduct,
  validateCart,
  validateOrder,
  errorHandler
};
