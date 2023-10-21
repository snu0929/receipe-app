const express=require('express')
const {UserModel}=require('../models/user.model')
const bcrypt=require('bcrypt')
const {auth}=require('../middleware/auth.middleware')
const { blacklist } = require("../blacklist");
const jwt=require('jsonwebtoken')
const userRouter=express.Router()
const axios = require('axios');
const apiKey = '599bbee066c940a3a39192da9852245d'; 

userRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 1);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: 'User Registered Successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed', message: error.message });
  }
});



userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token: token });
  } catch (error) {
    res.status(400).json({ message: 'Login failed', error: error.message });
  }
});

userRouter.post('/logout', auth,(req, res) => {
  
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    blacklist.push(token); 
  }
  res.status(200).json({ message: 'Logged out successfully' });
});


userRouter.post('/recipes/favorite/:recipeId', auth, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { userId } = req.user;

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the recipe is already in the user's favorites
    if (user.favorites.includes(recipeId)) {
      return res.status(400).json({ message: 'Recipe is already in favorites' });
    }

    // Add the recipe to the user's favorites
    user.favorites.push(recipeId);
    await user.save();

    res.status(200).json({ message: 'Recipe saved as favorite' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




userRouter.get('/recipes/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: { query, apiKey },
    });

    const recipes = response.data.results;
    res.json({ message: 'Recipes fetched successfully', recipes });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});


userRouter.get('/recipes/details/:recipeId', async (req, res) => {
  const { recipeId } = req.params;

  if (!recipeId) {
    return res.status(400).json({ error: 'Recipe ID parameter is required' });
  }

  try {
    // Make an API request to fetch recipe details
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
      params: { apiKey }, // You should ensure that apiKey is correctly configured
    });

    const recipeDetails = response.data;

    if (recipeDetails) {
      res.json({ message: 'Recipe details fetched successfully', recipeDetails });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch recipe details' });
  }
});





module.exports={
    userRouter
}