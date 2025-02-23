// routes/recipeRoutes.js
const express = require('express');
const recipeRouter = express.Router();
const recipeService = require('./db/recipeService');

// Get all recipes
recipeRouter.get('/recipes', async (req, res) => {
    try {
        const { page, limit, query, fields } = req.query;
        const result = await recipeService.getRecipes({
            page: parseInt(page),
            limit: parseInt(limit),
            query,
            fields
        });

        res.json({
            success: true,
            data: result.recipes,
            pagination: result.pagination
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching recipes',
            error: error.message
        });
    }
});

// Get single recipe
recipeRouter.get('/recipes/:id', async (req, res) => {
    try {
        const recipe = await recipeService.getRecipeById(req.params.id);
        res.json({
            success: true,
            data: recipe
        });
    } catch (error) {
        res.status(error.message === 'Recipe not found' ? 404 : 500).json({
            success: false,
            message: error.message
        });
    }
});

// Create recipe
recipeRouter.post('/recipes', async (req, res) => {
    try {
        const recipe = await recipeService.createRecipe(req.body);
        res.status(201).json({
            success: true,
            data: recipe
        });
    } catch (error) {
        res.status(error.message.includes('required') ? 400 : 500).json({
            success: false,
            message: error.message
        });
    }
});

// Update recipe
recipeRouter.put('/recipes/:id', async (req, res) => {
    try {
        const recipe = await recipeService.updateRecipe(req.params.id, req.body);
        res.json({
            success: true,
            data: recipe
        });
    } catch (error) {
        res.status(error.message === 'Recipe not found' ? 404 : 500).json({
            success: false,
            message: error.message
        });
    }
});

// Delete recipe
recipeRouter.delete('/recipes/:id', async (req, res) => {
    try {
        await recipeService.deleteRecipe(req.params.id);
        res.json({
            success: true,
            message: 'Recipe deleted successfully'
        });
    } catch (error) {
        res.status(error.message === 'Recipe not found' ? 404 : 500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = recipeRouter;
