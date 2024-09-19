const apiKey = "6VrnmsFF4BtG36MDku4HH1x94kNrEvJbi2_w-aZAwcU"; // Replace with your Unsplash API key
const apiURL = `https://api.unsplash.com/photos/random?count=5&client_id=${apiKey}`;

let currentImageIndex = 0;
let imageList = [];

// Fetch product images from Api
async function fetchProductImages() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=5"
    );
    const data = await response.json();
    imageList = data.map((item) => item.download_url); // imageList is List of images

    // Setting at the vary first time main image to the first image
    document.getElementById("mainImage").src = imageList[currentImageIndex];

    // Set the thumbnails
    const thumbnailsContainer = document.getElementById("thumbnails");
    thumbnailsContainer.innerHTML = ""; 

    imageList.forEach((image, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = image;
      imgElement.classList.add("thumbnail");
      imgElement.addEventListener("click", () => updateMainImage(index)); // this line will Change main image on click
      thumbnailsContainer.appendChild(imgElement);
    });
  } catch (error) {
    console.error("Error fetching product images:", error);
  }
}

function updateMainImage(index) {
  currentImageIndex = index;
  document.getElementById("mainImage").src = imageList[currentImageIndex];

  // Update the active thumbnail border 
  const thumbnails = document.querySelectorAll(".thumbnails img");
  thumbnails.forEach((thumbnail, idx) => {
    thumbnail.classList.toggle("active", idx === index);
  });
}

// Create carousel controls for navigation
document.getElementById("prev").addEventListener("click", () => {
  currentImageIndex =
    (currentImageIndex - 1 + imageList.length) % imageList.length;
  updateMainImage(currentImageIndex);
});

document.getElementById("next").addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % imageList.length;
  updateMainImage(currentImageIndex);
});

// call
fetchProductImages();

// implemeting add to Cart functionality
document.getElementById("addToCart").addEventListener("click", () => {
  document.getElementById("confirmationMessage").style.display = "block";
  setTimeout(() => {
    document.getElementById("confirmationMessage").style.display = "none";
  }, 2000);
});
