# MongoDB Integration Guide

## Overview
This application has been integrated with MongoDB using Mongoose as the ODM (Object Data Modeling) library. All data is now persisted in a MongoDB database instead of in-memory arrays.

## Setup Instructions

### 1. Install MongoDB Locally
- **Windows**: Download from https://www.mongodb.com/try/download/community
- **macOS**: `brew install mongodb-community`
- **Linux**: Follow the official MongoDB documentation

### 2. Start MongoDB Service
- **Windows**: MongoDB should start automatically after installation
- **macOS**: `brew services start mongodb-community`
- **Linux**: `sudo systemctl start mongod`

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Configuration
Create a `.env` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/webdev_practical
PORT=3000
NODE_ENV=development
```

### 5. Run the Application
```bash
npm start
```

The server will connect to MongoDB on startup.

---

## Database Schemas

### 1. **Product Schema**
```javascript
{
  _id: ObjectId,
  name: String (required),
  price: Number (required, min: 0),
  description: String,
  stock: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### 2. **User Schema**
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, valid email format),
  phone: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. **Student Schema**
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (valid email format),
  rollNumber: String,
  course: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. **Cart Schema**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  items: [
    {
      productId: ObjectId (ref: Product, required),
      quantity: Number (required, min: 1),
      price: Number (required)
    }
  ],
  total: Number (default: 0, min: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### 5. **Order Schema**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  items: [
    {
      productId: ObjectId (ref: Product, required),
      quantity: Number (required, min: 1),
      price: Number (required)
    }
  ],
  total: Number (required, min: 0),
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending'),
  shippingAddress: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Endpoints and CRUD Operations

### Products (`/products`)
- **GET** `/products` - Get all products
- **GET** `/products/:id` - Get a product by ID
- **POST** `/products` - Create a new product
- **PUT** `/products/:id` - Update a product
- **DELETE** `/products/:id` - Delete a product

### Users (`/users`)
- **GET** `/users` - Get all users
- **GET** `/users/:id` - Get a user by ID
- **POST** `/users` - Create a new user
- **PUT** `/users/:id` - Update a user
- **DELETE** `/users/:id` - Delete a user

### Students (`/students`)
- **GET** `/students` - Get all students
- **GET** `/students/:id` - Get a student by ID
- **POST** `/students` - Create a new student
- **PUT** `/students/:id` - Update a student
- **DELETE** `/students/:id` - Delete a student

### Cart (`/cart`)
- **GET** `/cart` - Get all carts (with user and product details)
- **GET** `/cart/:id` - Get a cart by ID (with user and product details)
- **POST** `/cart` - Create a new cart
- **PUT** `/cart/:id` - Update a cart
- **DELETE** `/cart/:id` - Delete a cart

### Orders (`/orders`)
- **GET** `/orders` - Get all orders (with user and product details)
- **GET** `/orders/:id` - Get an order by ID (with user and product details)
- **POST** `/orders` - Create a new order
- **PUT** `/orders/:id` - Update an order
- **DELETE** `/orders/:id` - Delete an order

---

## Example Requests

### Create a Product
```bash
POST /products
Content-Type: application/json

{
  "name": "Laptop",
  "price": 1000,
  "description": "High-performance laptop",
  "stock": 50
}
```

### Create a User
```bash
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

### Create a Student
```bash
POST /students
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "rollNumber": "CS001",
  "course": "Computer Science"
}
```

### Create an Order
```bash
POST /orders
Content-Type: application/json

{
  "userId": "64a1f2b9c4d5e6f7g8h9i0j1",
  "items": [
    {
      "productId": "64a1f2b9c4d5e6f7g8h9i0k2",
      "quantity": 2,
      "price": 1000
    }
  ],
  "shippingAddress": "456 Oak Ave"
}
```

### Create a Cart
```bash
POST /cart
Content-Type: application/json

{
  "userId": "64a1f2b9c4d5e6f7g8h9i0j1",
  "items": [
    {
      "productId": "64a1f2b9c4d5e6f7g8h9i0k2",
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

---

## File Structure

```
project/
├── models/
│   ├── Product.js      # Product schema and model
│   ├── User.js         # User schema and model
│   ├── Student.js      # Student schema and model
│   ├── Cart.js         # Cart schema and model
│   └── Order.js        # Order schema and model
├── controllers/
│   ├── productcontroller.js
│   ├── usercontroller.js
│   ├── studentcontroller.js
│   ├── cartcontroller.js
│   └── ordercontroller.js
├── routes/
│   ├── productroute.js
│   ├── userroute.js
│   ├── studentroute.js
│   ├── cartroute.js
│   └── orderroute.js
├── middleware.js       # Validation middleware
├── db.js              # MongoDB connection setup
├── app.js             # Express app initialization
├── package.json       # Project dependencies
└── .env              # Environment variables
```

---

## Key Features

1. **Mongoose Models**: All data models are defined with validation rules
2. **Auto Timestamps**: `createdAt` and `updatedAt` fields are automatically managed
3. **Data Population**: Related data is automatically populated (e.g., User in Order, Product in Cart)
4. **Async/Await**: All CRUD operations use async/await pattern
5. **Error Handling**: Comprehensive error handling with meaningful messages
6. **Data Validation**: Built-in schema validation and constraints
7. **Unique Constraints**: Email fields are set as unique to prevent duplicates

---

## MongoDB Atlas (Cloud Database)

To use MongoDB Atlas instead of local MongoDB:

1. Create an account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and get the connection string
3. Update `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/webdev_practical?retryWrites=true&w=majority
```

---

## Troubleshooting

### Connection Issues
- Ensure MongoDB service is running
- Check MongoDB URI in `.env` is correct
- Verify firewall settings allow MongoDB port (27017)

### Validation Errors
- Check required fields are provided
- Email must be valid format
- Price and stock cannot be negative

### MongoDB Atlas Connection
- Check IP whitelist in MongoDB Atlas
- Verify username and password are URL-encoded
- Use correct cluster name in connection string

---

## Additional Resources
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
