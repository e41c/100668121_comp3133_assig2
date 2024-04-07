// backend/Routes/userRoutes.js

const { Router } = require('express');
const { MongoClient } = require('mongodb');
const { generateToken, hashPassword, comparePassword } = require('../authMiddleware');

const uri = 'mongodb+srv://admin:Reitzel@e41c.tm3gpox.mongodb.net/?retryWrites=true&w=majority&appName=e41c';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

async function connectToMongoDB() {
  try {
    await client.connect();
    db = client.db('your_database_name'); // Replace 'your_database_name' with your actual database name
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user with the given email
  const user = await db.collection('users').findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare password with hashed password
  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Generate JWT token
  const token = generateToken(user._id);

  res.json({ token });
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Hash password before storing in database
  const hashedPassword = await hashPassword(password);

  // Insert user data into MongoDB
  await db.collection('users').insertOne({ email, password: hashedPassword });

  res.status(201).json({ message: 'User created successfully' });
});

module.exports = router;
