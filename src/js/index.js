// Global app controller

import Recipe from "./models/recipe";
import Search from "./models/search";
import { clearLoader, elements, renderLoader } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";



const state = {};

window.state = state;


/* Search controller */
const  controlSearch =  async () => {
    // get query from view
    const query = searchView.getInput();

    if(query){
        // New Search Object and add state
        state.search = new Search(query);

        // prepare for UI result
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResultList);

        await state.search.getResults();

        clearLoader();

        searchView.renderResult(state.search.result)
    }
}

/* recipe controller */
const controlRecipe = async () => {
    // Get id from URL
    const id = window.location.hash.replace(/#/g, "");

    if (id) {
        //Prepare UI
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        if(state.search) searchView.highlightSelected(id);

        //Create new recipe object
        state.recipe = new Recipe (id);


        //Call API request
        await state.recipe.getRecipe()


        //Render recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe)

    }
}



elements.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    controlSearch();
})

elements.searchResultPages.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-inline");

    if (btn) {
        const gotoPage = +btn.dataset.goto;
        searchView.clearResults();
        searchView.renderResult(state.search.result, gotoPage)
    }
})

window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);

elements.recipe.addEventListener("click", (e) => {

    
    if (e.target.matches(".btn-decrease, .btn-decrease *")) {
        //decrease
        state.recipe.updateServings("dec")
        recipeView.updateServingsIngredients(state.recipe)
    } else if (e.target.matches(".btn-increase, .btn-increase *")) {
        //increase
        state.recipe.updateServings("inc")
        recipeView.updateServingsIngredients(state.recipe)
    }
     
});

