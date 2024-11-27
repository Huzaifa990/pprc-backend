const express = require("express");
const { getAllRecipes, getRecipesById, updateRecipe, addRecipe, deleteRecipe } = require("../../Controllers/Recipes");
const app = express();

app.get("/", getAllRecipes);
app.get("/:id", getRecipesById);
app.patch("/:id", updateRecipe);
app.post("/", addRecipe);
app.delete("/:id", deleteRecipe);


module.exports = app;