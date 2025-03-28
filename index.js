console.log('%c HI', 'color: firebrick')
// API URLs
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

// DOM Element References
const dogImagesContainer = document.querySelector('#dog-image-container');
const breedsList = document.querySelector('#dog-breeds');
const breedDropdown = document.querySelector('#breed-dropdown');

// Challenge 1: Fetch and Display Random Dog Images
async function fetchDogImages() {
    try {
        const response = await fetch(imgUrl);
        const data = await response.json();
        
        // Clear previous images
        dogImagesContainer.innerHTML = '';
        
        // Create and append image elements
        data.message.forEach(imageUrl => {
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.style.width = '200px';
            imgElement.style.height = '200px';
            imgElement.style.objectFit = 'cover';
            dogImagesContainer.appendChild(imgElement);
        });
    } catch (error) {
        console.error('Error fetching dog images:', error);
    }
}

// Challenge 2: Fetch and Display Dog Breeds
async function fetchDogBreeds() {
    try {
        const response = await fetch(breedUrl);
        const data = await response.json();
        
        // Clear previous breeds
        breedsList.innerHTML = '';
        
        // Create list items for each breed
        Object.keys(data.message).forEach(breed => {
            const listItem = document.createElement('li');
            listItem.textContent = breed;
            breedsList.appendChild(listItem);
        });

        // Challenge 3: Add click color change
        addBreedColorToggle();

        // Challenge 4: Setup breed filter
        setupBreedFilter(data.message);
    } catch (error) {
        console.error('Error fetching dog breeds:', error);
    }
}

// Challenge 3: Toggle Breed List Item Color
function addBreedColorToggle() {
    breedsList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            // Toggle between default and highlight color
            event.target.style.color = 
                event.target.style.color === 'red' ? 'black' : 'red';
        }
    });
}

// Challenge 4: Breed Filter
function setupBreedFilter(breeds) {
    // Populate dropdown with A-D letters
    ['a', 'b', 'c', 'd'].forEach(letter => {
        const option = document.createElement('option');
        option.value = letter;
        option.textContent = letter.toUpperCase();
        breedDropdown.appendChild(option);
    });

    // Filter breeds on dropdown change
    breedDropdown.addEventListener('change', (event) => {
        const selectedLetter = event.target.value;
        const breedItems = breedsList.querySelectorAll('li');

        breedItems.forEach(item => {
            const breed = item.textContent.toLowerCase();
            if (selectedLetter === 'all' || breed.startsWith(selectedLetter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Initialize all challenges
function initDogApp() {
    fetchDogImages();
    fetchDogBreeds();
}

// Ensure DOM is loaded before running scripts
document.addEventListener('DOMContentLoaded', initDogApp);