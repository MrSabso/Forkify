import axios from "axios";


export default class Recipe{
    constructor(id){
        this.id = id;
    }


    async getRecipe() {
        const { data: recipeObj } = await axios(`https://forkify-api.herokuapp.com/api/v2/recipes/${this.id}`);
        this.title = recipeObj.data.recipe.title
        this.author = recipeObj.data.recipe.publisher 
        this.img = recipeObj.data.recipe.image_url
        this.url = recipeObj.data.recipe.source_url
        this.ingredients = recipeObj.data.recipe.ingredients
        this.servings = recipeObj.data.recipe.servings
        this.time = recipeObj.data.recipe.cooking_time
    }


    updateServings(type){
        //Servings
        const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;

        //Ingredients
        this.ingredients.forEach(ing => ing.quantity *= (newServings / this.servings));


        this.servings = newServings
    }
}