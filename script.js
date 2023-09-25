const API_KEY = "2917b62d0e1c41e288f9ecf0ce4bc984";
const recipelistEl = document.getElementById("recipe-list");

function displayRecipes(recipes){
    recipelistEl.innerHTML="";
    recipes.forEach((recipe) => {
        const recipeItemEL = document.createElement("li");
        recipeItemEL.classList.add("recipe-item");
        
        recipeImageEl= document.createElement("img");
        recipeImageEl.src = recipe.image;
        recipeImageEl.alt = "recipe image";

        recipeTitleEl = document.createElement("h2");
        recipeTitleEl.innerText=recipe.title;

        recipeIngredientsEl = document.createElement("p");
        recipeIngredientsEl.innerHTML = `
        <strong>Ingredients:</strong> ${recipe.extendedIngredients.map((ingredient) => ingredient.original).join(", ")}`;

        recipeLinkEl = document.createElement("a");
        recipeLinkEl.href = recipe.sourceUrl;
        recipeLinkEl.innerText ="View Recipe";

        recipeItemEL.appendChild(recipeImageEl);
        recipeItemEL.appendChild(recipeTitleEl);
        recipeItemEL.appendChild(recipeIngredientsEl);
        recipeItemEL.appendChild(recipeLinkEl);
        recipelistEl.appendChild(recipeItemEL);
    });
    }

async function getRecipes(){
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`);

    const data = await response.json();

    return data.recipes;
}

async function init(){
    const recipes = await getRecipes();
    displayRecipes(recipes)
}

init();