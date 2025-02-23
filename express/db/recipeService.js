// services/recipeService.js
const mongoose = require('mongoose');
const mongoConnect = require('./mongoConnect');

// Recipe Schema
const RecipeSchema = new mongoose.Schema({
    name: String,
    ingredients: String,
    directions: String,
    category: String,
    author: String
}, { collection: 'recipes' });

// Initialize model
let Recipe;
try {
    Recipe = mongoose.model('Recipe');
} catch {
    Recipe = mongoose.model('Recipe', RecipeSchema);
}

// Service methods
const recipeService = {
    // Get recipes with pagination and search
    async getRecipes({ page, limit, query, fields }) {
        const skip = (page - 1) * limit;
        let searchQuery = {};

        if (query) {
            searchQuery = {
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { ingredients: { $regex: query, $options: 'i' } },
                    { directions: { $regex: query, $options: 'i' } },
                    { category: { $regex: query, $options: 'i' } }
                ]
            }
        }

        await mongoConnect();
        const recipes = await Recipe.find(searchQuery, fields)
            .sort({ name: 1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Recipe.countDocuments(searchQuery);

        return {
            recipes,
            pagination: {
                current: page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    },

    // Get single recipe by ID
    async getRecipeById(id) {
        await mongoConnect();
        const recipe = await Recipe.findById(id).lean();

        if (!recipe) {
            throw new Error('Recipe not found');
        }

        return recipe;
    },

    // Create new recipe
    async createRecipe(recipeData) {
        const { name, ingredients, directions, category, author } = recipeData;

        if (!name || !ingredients || !directions) {
            throw new Error('Name, ingredients, and directions are required');
        }

        await mongoConnect();
        const recipe = new Recipe({
            name,
            ingredients,
            directions,
            category,
            author
        });

        return await recipe.save();
    },

    // Update recipe
    async updateRecipe(id, recipeData) {
        await mongoConnect();
        const recipe = await Recipe.findByIdAndUpdate(
            id,
            recipeData,
            { new: true, runValidators: true }
        );

        if (!recipe) {
            throw new Error('Recipe not found');
        }

        return recipe;
    },

    // Delete recipe
    async deleteRecipe(id) {
        await mongoConnect();
        const recipe = await Recipe.findByIdAndDelete(id);

        if (!recipe) {
            throw new Error('Recipe not found');
        }

        return true;
    }
};

module.exports = recipeService;
