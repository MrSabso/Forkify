import { elements } from "./base";


export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
}

export const clearResults = () => {
    elements.searchResultList.innerHTML = "";
    elements.searchResultPages.innerHTML = "";
}

export const highlightSelected = id => {
    const linkArr = [...document.querySelectorAll(".results__link")];

    linkArr.forEach(el => el.classList.remove("results__link--active"));

    document.querySelector(`.results__link[href="#${id}"]`).classList.add("results__link--active");
}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(" ").reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur)
            }

            return acc + cur.length
        }, 0)

        return `${newTitle.join(" ")}...`
    } 

    return title;
}

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type == "prev" ? page - 1 : page + 1}">
        <span>Page ${type == "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type == "prev" ? "left" : "right"}"></use>
        </svg>
    </button>
`

const renderButton = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage); //28 / 5 = 5.6 => 6

    let button;
    if (page === 1 && pages > 1) {
        // Only next Button
        button = createButton(page, 'next')
    } else if (page < pages) {
        // Both Button
        button = `${createButton(page, "prev")}${createButton(page, "next")}`
    } else if (page === pages && page > 1) {
        // Only prev Button
        button = createButton(page, "prev")
    }

    elements.searchResultPages.insertAdjacentHTML("afterbegin", button)
}


const renderRecipe = (recipe) => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `

    elements.searchResultList.insertAdjacentHTML("beforeend", markup)
}

export const renderResult = (recipes, page = 1, resPerPage = 10) => {
    // Render result
    
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    
    //Render pagination buttons

    renderButton(page, recipes.length, resPerPage);
}