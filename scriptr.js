// Store recipes in localStorage
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

// DOM Elements
const recipeList = document.getElementById('recipeList');
const addRecipeBtn = document.getElementById('addRecipeBtn');
const addRecipeModal = document.getElementById('addRecipeModal');
const recipeDetailsModal = document.getElementById('recipeDetailsModal');
const recipeForm = document.getElementById('recipeForm');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const closeModal = document.getElementById('closeModal');
const closeDetails = document.getElementById('closeDetails');

// Event Listeners
addRecipeBtn.addEventListener('click', () => addRecipeModal.style.display = 'block');
closeModal.addEventListener('click', () => addRecipeModal.style.display = 'none');
closeDetails.addEventListener('click', () => recipeDetailsModal.style.display = 'none');
searchInput.addEventListener('input', filterRecipes);
categoryFilter.addEventListener('change', filterRecipes);
recipeForm.addEventListener('submit', addRecipe);

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === addRecipeModal) addRecipeModal.style.display = 'none';
    if (e.target === recipeDetailsModal) recipeDetailsModal.style.display = 'none';
});

// Add new recipe
function addRecipe(e) {
    e.preventDefault();
    
    const formData = new FormData(recipeForm);
    const recipe = {
        id: Date.now(),
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        imageUrl: formData.get('imageUrl') || 'https://via.placeholder.com/300x200',
        ingredients: formData.get('ingredients').split('\n').filter(i => i.trim()),
        instructions: formData.get('instructions').split('\n').filter(i => i.trim())
    };
    
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    
    recipeForm.reset();
    addRecipeModal.style.display = 'none';
    displayRecipes(recipes);
}

// Display recipes
function displayRecipes(recipesToShow) {
    recipeList.innerHTML = '';
    
    recipesToShow.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.onclick = () => showRecipeDetails(recipe);
        
        card.innerHTML = `
            <img src="${recipe.imageUrl}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <span class="recipe-category">${recipe.category}</span>
            </div>
        `;
        
        recipeList.appendChild(card);
    });
}

// Show recipe details
function showRecipeDetails(recipe) {
    const details = document.getElementById('recipeDetails');
    details.innerHTML = `
        <img src="${recipe.imageUrl}" alt="${recipe.title}" class="recipe-details-image">
        <h2 class="recipe-details-title">${recipe.title}</h2>
        <p class="recipe-details-description">${recipe.description}</p>
        <div class="recipe-details-section">
            <h3>Ingredients</h3>
            <ul>
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
        <div class="recipe-details-section">
            <h3>Instructions</h3>
            <ol>
                ${recipe.instructions.map(inst => `<li>${inst}</li>`).join('')}
            </ol>
        </div>
    `;
    
    recipeDetailsModal.style.display = 'block';
}

// Filter recipes
function filterRecipes() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryTerm = categoryFilter.value;
    
    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm) ||
                            recipe.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryTerm || recipe.category === categoryTerm;
        return matchesSearch && matchesCategory;
    });
    
    displayRecipes(filteredRecipes);
}

// Initial display
displayRecipes(recipes);

// Add sample recipes if none exist
if (recipes.length === 0) {
    const sampleRecipes = [
        {
            id: 1,
            title: "Classic Pancakes",
            description: "Fluffy and delicious breakfast pancakes",
            category: "Breakfast",
            imageUrl: "https://images.unsplash.com/photo-1601315379734-425a469078de",
            ingredients: ["2 cups flour", "2 eggs", "1 cup milk", "2 tbsp sugar"],
            instructions: ["Mix dry ingredients", "Add wet ingredients", "Cook on griddle"]
        },
        {
            id: 2,
            title: "Garden Salad",
            description: "Fresh and healthy garden salad",
            category: "Lunch",
            imageUrl: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132",
            ingredients: ["Lettuce", "Tomatoes", "Cucumber", "Olive oil"],
            instructions: ["Wash vegetables", "Chop ingredients", "Mix and serve"]
        },
        {
            id: 6,
            title: "Classic Pancakes",
            description: "Fluffy and delicious breakfast pancakes",
            category: "Breakfast",
            imageUrl: "https://images.unsplash.com/photo-1601315379734-425a469078de",
            ingredients: ["2 cups flour", "2 eggs", "1 cup milk", "2 tbsp sugar"],
            instructions: ["Mix dry ingredients", "Add wet ingredients", "Cook on griddle"]
        },
        {
            id: 7,
            title: "Classic Pancakes",
            description: "Fluffy and delicious breakfast pancakes",
            category: "Breakfast",
            imageUrl: "https://images.unsplash.com/photo-1601315379734-425a469078de",
            ingredients: ["2 cups flour", "2 eggs", "1 cup milk", "2 tbsp sugar"],
            instructions: ["Mix dry ingredients", "Add wet ingredients", "Cook on griddle"]
        },
        {
            id: 5,
            title: "Classic Pancakes",
            description: "Fluffy and delicious breakfast pancakes",
            category: "Breakfast",
            imageUrl: "https://images.unsplash.com/photo-1601315379734-425a469078de",
            ingredients: ["2 cups flour", "2 eggs", "1 cup milk", "2 tbsp sugar"],
            instructions: ["Mix dry ingredients", "Add wet ingredients", "Cook on griddle"]
        },

    ];
    
    recipes = sampleRecipes;
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes(recipes);
}
