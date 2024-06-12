const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const urlCategory = "?categories=18";

fetch(baseURL + urlCategory)
    .then((res) => res.json())
    .then((posts) => {
        console.log(posts);
    })
.catch((err) => {
    console.error("Something went wrong, try again later", err);
});