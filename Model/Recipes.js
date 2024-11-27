const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    cookingTime: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
})

const Recipe = new mongoose.model("recipes", recipeSchema);
module.exports = Recipe;