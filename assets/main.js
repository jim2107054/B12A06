console.log('main.js loaded');

const API_BASE_URL = 'https://openapi.programming-hero.com/api';

let cart = [];
let allPlants = [];
let categories = [];

const categoryButtons = document.querySelectorAll('.category-btn');
const treeCardsContainer = document.getElementById('tree-cards');
const cartItemsContainer = document.getElementById('cart-items');
const totalAmountElement = document.getElementById('total-amount');
const cartTotalSection = document.getElementById('cart-total');
const emptyCartMessage = document.getElementById('empty-cart');
const loadingIndicator = document.getElementById('loading');


document.addEventListener('DOMContentLoaded', function() {
  loadCategories();
  loadAllPlants();
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      categoryButtons.forEach(btn => {
        btn.classList.remove('bg-green-600', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
      });
      this.classList.remove('bg-gray-100', 'text-gray-700');
      this.classList.add('bg-green-600', 'text-white');
      
      if (category === 'all') {
        displayTrees(allPlants);
      } else {
        fetchPlantsByCategory(category);
      }
    });
  });
});

async function loadCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    const data = await response.json();
    categories = data.data || [];
    console.log('Categories loaded:', categories);
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

async function loadAllPlants() {
  try {
    showLoading();
    const response = await fetch(`${API_BASE_URL}/plants`);
    const data = await response.json();
    allPlants = data.plants || [];
    hideLoading();
    displayTrees(allPlants);
    console.log('All plants loaded:', allPlants.length);
  } catch (error) {
    console.error('Error loading plants:', error);
    hideLoading();
    treeCardsContainer.innerHTML = '<div class="col-span-full text-center py-8"><p class="text-red-500">Error loading plants. Please try again.</p></div>';
  }
}

async function fetchPlantsByCategory(categoryId) {
  try {
    showLoading();
    const response = await fetch(`${API_BASE_URL}/category/${categoryId}`);
    const data = await response.json();
    const plants = data.plants || [];
    hideLoading();
    displayTrees(plants);
  } catch (error) {
    console.error('Error loading plants by category:', error);
    hideLoading();
    treeCardsContainer.innerHTML = '<div class="col-span-full text-center py-8"><p class="text-red-500">Error loading plants. Please try again.</p></div>';
  }
}

function showLoading() {
  loadingIndicator.classList.remove('hidden');
  treeCardsContainer.innerHTML = '';
}

function hideLoading() {
  loadingIndicator.classList.add('hidden');
}

function displayTrees(plants) {
  if (!plants || plants.length === 0) {
    treeCardsContainer.innerHTML = '<div class="col-span-full text-center py-8"><p class="text-gray-500">No plants found in this category</p></div>';
    return;
  }
  
  const cardsHTML = plants.map(plant => `
    <div class="bg-gray-100 rounded-lg p-4 border hover:shadow-md transition-shadow duration-200">
      <div class="text-center mb-3">
        <div class="w-full h-32 bg-gray-200 rounded mb-3 flex items-center justify-center overflow-hidden">
          ${plant.image ? 
            `<img src="${plant.image}" alt="${plant.name}" class="w-full h-full object-cover rounded">` : 
            '<div class="text-4xl text-gray-400"></div>'
          }
        </div>
        <h3 class="font-bold text-left text-lg text-gray-800 mb-2">${plant.name}</h3>
        <p class="text-sm line-clamp-2 text-gray-600 mb-3">${plant.description}</p>
        <div class="mb-2 flex items-center justify-between mx-2">
          <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">${plant.category_name || 'Fruit Tree'}</span>
          <p class="text-xl font-bold text-gray-800">৳${plant.price || '500'}</p>
        </div>
      </div>
      <button 
        class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
        onclick="addToCart('${plant.id}', '${(plant.name || 'Tree').replace(/'/g, "\\'")}', ${plant.price || 500})"
      >
        Add to Cart
      </button>
    </div>
  `).join('');
  
  treeCardsContainer.innerHTML = cardsHTML;
}

function addToCart(id, name, price) {
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      quantity: 1
    });
  }
  
  updateCartDisplay();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartDisplay();
}

function updateCartDisplay() {
  if (cart.length === 0) {
    emptyCartMessage.classList.remove('hidden');
    cartTotalSection.classList.add('hidden');
    cartItemsContainer.innerHTML = '<div id="empty-cart" class="text-center py-8"><p class="text-gray-500">Your cart is empty</p></div>';
    return;
  }
  
  emptyCartMessage.classList.add('hidden');
  cartTotalSection.classList.remove('hidden');
  
  const cartHTML = cart.map(item => `
    <div class="bg-gray-50 rounded-lg p-3 border mb-2">
      <div class="flex justify-between items-start">
        <!-- Left div -->
        <div class="flex-1">
          <h4 class="font-medium text-sm text-gray-800 mb-1">${item.name}</h4>
          <div class="text-sm text-gray-600">
            ৳${item.price} × ${item.quantity}
          </div>
        </div>
        <!-- Right div -->
        <button 
          onclick="removeFromCart('${item.id}')"
          class="text-red-500 hover:text-red-700 text-lg ml-2"
        >
          ×
        </button>
      </div>
    </div>
  `).join('');
  
  cartItemsContainer.innerHTML = cartHTML;
  
  // Calculate and display total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalAmountElement.textContent = `৳${total}`;
}
