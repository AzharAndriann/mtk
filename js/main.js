const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", function () {
  navbar.classList.toggle("active", window.scrollY > 80);
});

const tombol = document.querySelector(".balik");
window.addEventListener("scroll", function () {
  tombol.classList.toggle("active", window.scrollY > 400);
});

/* Get the DOM elements for the image carousel
const wrapper = document.querySelector(".wrapper"),
  carousel = document.querySelector(".carousel"),
  images = document.querySelectorAll("img"),
  buttons = document.querySelectorAll(".button");
let imageIndex = 1,
  intervalId;
// Define function to start automatic image slider
const autoSlide = () => {
  // Start the slideshow by calling slideImage() every 3 seconds
  intervalId = setInterval(() => slideImage(++imageIndex), 3500);
};
// Call autoSlide function on page load
autoSlide();
// A function that updates the carousel display to show the specified image
const slideImage = () => {
  // Calculate the updated image index
  imageIndex = imageIndex === images.length ? 0 : imageIndex < 0 ? images.length - 1 : imageIndex;
  // Update the carousel display to show the specified image
  carousel.style.transform = `translate(-${imageIndex * 100}%)`;
};
// A function that updates the carousel display to show the next or previous image
const updateClick = (e) => {
  // Stop the automatic slideshow
  clearInterval(intervalId);
  // Calculate the updated image index based on the button clicked
  imageIndex += e.target.id === "next" ? 1 : -1;
  slideImage(imageIndex);
  // Restart the automatic slideshow
  autoSlide();
};
// Add event listeners to the navigation buttons
buttons.forEach((button) => button.addEventListener("click", updateClick));
// Add mouseover event listener to wrapper element to stop auto sliding
wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
// Add mouseleave event listener to wrapper element to start auto sliding again
wrapper.addEventListener("mouseleave", autoSlide);*/

// foto
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
