// Mobile pop up menu
const openMenu = document.querySelector(".mobileOpenMenu");
const closeMenu = document.querySelector(".mobileCloseMenu");
const navMenu = document.querySelector(".navPoints");

openMenu.addEventListener('click', () => {
    navMenu.classList.add("jsMenuToggle");
});

closeMenu.addEventListener('click', () => {
    navMenu.classList.remove("jsMenuToggle");
});


const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const urlCategoryRecipe = "?categories=10";

fetch(baseURL + urlCategoryRecipe)
    .then((res) => res.json())
    .then((posts) => {
        console.log(posts);
    })
.catch((err) => {
    console.error("Something went wrong, try again later", err);
});