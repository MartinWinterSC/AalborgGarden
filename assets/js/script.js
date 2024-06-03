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