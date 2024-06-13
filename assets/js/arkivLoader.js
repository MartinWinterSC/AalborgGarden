const archiveCompetitionContainerEl = document.querySelector(".archiveCompetitionContainer");
const archiveGalleryContainerEl = document.querySelector(".archiveGalleryContainer");

const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const category14 = "?categories=14&per_page=3";
const category18 = "?categories=18&per_page=3";

const fetchRequests = [
    fetch(baseURL + category14).then(res => res.json()),
    fetch(baseURL + category18).then(res => res.json())
];

Promise.all(fetchRequests)
    .then(data => {
        let category14Data = data[0];
        let category18Data = data[1];

        let galleryContent = "";
        category14Data.forEach(item => {
            const content = renderGallery(item);
            galleryContent += content;
        });
        archiveGalleryContainerEl.innerHTML = galleryContent;

        let competitionContent = "";
        category18Data.forEach(item => {
            const content = renderCompetition(item);
            competitionContent += content;
        });
        archiveCompetitionContainerEl.innerHTML = competitionContent;
    })
    .catch(err => {
        console.error("Something went wrong, try again later", err);
    });

function renderGallery(item) {
    const { album_navn, billede_1 } = item.acf;
    const id = item.id;

    return `
        <a href="./galleriAlbum.html?id=${id}">
            <h3>${album_navn}</h3>
            <img src="${billede_1.url}" alt="${billede_1.title}" class="fullBodyImg">
        </a>`;
}

function renderCompetition(item) {
    const { konkurrence_navn, konkurrence_logo } = item.acf;
    const id = item.id;

    return `
        <a href="./placeringFocused.html?id=${id}">
            <h3>${konkurrence_navn}</h3>
            <img src="${konkurrence_logo.url}" alt="${konkurrence_logo.title}" class="fullBodyImg">
        </a>`;
}
