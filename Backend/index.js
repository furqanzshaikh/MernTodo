require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const connectDb = require('./connection/connectDb');
const User = require('./models/userSchema');
const Todo = require('./models/todoSchema');
const { responseLogger, requestLogger } = require('./loggingMiddleware');
const { validateRequestBody } = require('./validationMiddleware');

// Initialize Express app
const app = express();
const port = process.env.PORT || 4000;

// Database connection
connectDb();

// Middleware
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(responseLogger);

// Routes

// Root route
app.get('/', (req, res) => {
  res.send('Server is working');
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await Todo.find({});
    res.status(200).json({ todos: allTodos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single todo by ID
app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const singleTodo = await Todo.findById(id);
    if (!singleTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ todo: singleTodo });
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new todo
app.post('/todos/create', validateRequestBody, async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const newTodo = await Todo.create({ title, description, category });
    res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(400).json({ error: 'Bad request, unable to create todo' });
  }
});

// Update an existing todo
app.put('/todos/update/:id', validateRequestBody, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo updated successfully', todo: updatedTodo });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a todo
app.delete('/todos/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User registration
app.post('/create/user', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Logout route (client-side handling)
app.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logout successful (handled on client-side)' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
