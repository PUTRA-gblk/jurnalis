// Preloader Animation
setTimeout(function () {
  var preloader = document.getElementById("preloader");
  var mainContent = document.getElementById("main-content");
  preloader.classList.add("custom-loader");
  mainContent.style.display = "block";
}, 3000);


//Just Another Fail :cry:
// Show the preloader initially
// var preloader = document.getElementById("preloader");
// var mainContent = document.getElementById("main-content");
// mainContent.style.display = "none";

// window.addEventListener("load", function() {
//   setTimeout(function() {
//     preloader.classList.add("loaded");
//     mainContent.style.display = "block";
//   }, 4200);
// });

// Other JS

let activeIndex = 0;
const slides = document.getElementsByTagName("article");
const handleLeftClick = () => {
  const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : slides.length - 1;
  const [currentSlide, nextSlide] = getSlideElements(activeIndex, nextIndex);

  setSlideStatus(currentSlide, "after");
  setSlideStatus(nextSlide, "becoming-active-from-before");

  setTimeout(() => {
    setSlideStatus(nextSlide, "active");
    activeIndex = nextIndex;
  });
};

const handleRightClick = () => {
  const nextIndex = activeIndex + 1 <= slides.length - 1 ? activeIndex + 1 : 0;
  const [currentSlide, nextSlide] = getSlideElements(activeIndex, nextIndex);

  setSlideStatus(currentSlide, "before");
  setSlideStatus(nextSlide, "becoming-active-from-after");

  setTimeout(() => {
    setSlideStatus(nextSlide, "active");
    activeIndex = nextIndex;
  });
};

const getSlideElements = (currentIndex, nextIndex) => [
  document.querySelector(`[data-index="${currentIndex}"]`),
  document.querySelector(`[data-index="${nextIndex}"]`),
];

const setSlideStatus = (slide, status) => {
  slide.dataset.status = status;
};

// Mobile Nav Toggle

const nav = document.querySelector("nav");
const handleNavToggle = () => {
  nav.dataset.transitionable = "true";
  nav.dataset.toggled = nav.dataset.toggled === "true" ? "false" : "true";
};

const mediaQuery = window.matchMedia("(max-width: 800px)");
mediaQuery.onchange = (e) => {
  nav.dataset.transitionable = "false";
  nav.dataset.toggled = "false";
};

// Theme Toggle
// document.addEventListener("DOMContentLoaded", function () {
//   const savedTheme = localStorage.getItem("theme");
//   const body = document.body;
//   const toggleIcon = document.getElementById("toggle-icon");

//   if (savedTheme === "dark") {
//     body.classList.add("dark-mode");
//     toggleIcon.classList.remove("uil-sun");
//     toggleIcon.classList.add("uil-moon");
//   }
// });

// function toggleDarkLightMode() {
//   const body = document.body;
//   const toggleIcon = document.getElementById("toggle-icon");

//   // Toggle dark mode class on body
//   // body.classList.toggle("dark-mode");

//   // Toggle icon based on mode
//   if (body.classList.contains("dark-mode")) {
//     toggleIcon.classList.remove("uil-sun");
//     toggleIcon.classList.add("uil-moon");
//     localStorage.setItem("theme", "dark");
//   } else {
//     toggleIcon.classList.remove("uil-moon");
//     toggleIcon.classList.add("uil-sun");
//     localStorage.setItem("theme", "light");
//   }
// }

// Function to toggle FAQ answer visibility
function toggleFAQAnswer(event) {
  const answer = event.target.nextElementSibling;
  answer.classList.toggle("show");
  event.target.classList.toggle("opened");
}

// Add event listeners to FAQ questions
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach(function (question) {
  question.addEventListener("click", toggleFAQAnswer);
});

  window.onload = function() {
    // Tampilkan pop-up notifikasi saat halaman selesai dimuat
    var popup = document.getElementById("popup");
    popup.style.display = "block"; // Tampilkan pop-up

    // Fungsi untuk menyembunyikan pop-up saat tombol ditutup
    document.getElementById("closeBtn").onclick = function() {
      popup.style.display = "none"; // Sembunyikan pop-up
    };
  };

