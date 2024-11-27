const Recipe = require("../Model/Recipes");

const addRecipe = (req, res) => {
    try {
        const add = new Recipe(req.body);
        add.save().then(()=>{
            res.status(200).send(add);
        }).catch((e)=>{
            res.status(400).send(e);
        })     
    } catch (error) {
        res.status(400).send(error);
    }
}

const getAllRecipes = async (req, res) => {
    try {
        const allRecipes = await Recipe.find();
        res.status(200).send(allRecipes);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getRecipesById = async (req, res) => {
    try {
        const id = req.params.id;
        const allRecipes = await Recipe.findById(id);
        res.status(200).send(allRecipes);
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateRecipe = async (req, res) => {
    try {
        const id = req.params.id;
        const allRecipes = await Recipe.findByIdAndUpdate({_id: id}, req.body, {new: true});
        res.status(200).send(allRecipes);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const id = req.params.id;
        const allRecipes = await Recipe.findByIdAndDelete(id);
        res.status(200).send(allRecipes);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    getAllRecipes,
    addRecipe,
    updateRecipe,
    getRecipesById,
    deleteRecipe
}