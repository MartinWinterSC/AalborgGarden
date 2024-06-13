const albumContainerEl = document.querySelector(".galleriOverview");

const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const urlCategory = "?categories=14&per_page=100";

fetch(baseURL + urlCategory)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

        function renderAlbum(album){
            const { album_navn, billede_1, billede_2, billede_3 } = album.acf;
            
            let content = 
            `<article>
                <h2>${album_navn}</h2>
                <div class="galleryImgContainer">
                    <img src="${billede_1.url}" alt="${billede_1.title}">
                    <img src="${billede_2.url}" alt="${billede_2.title}">
                    <div class="desktopImg">
                        <img src="${billede_3.url}" alt="${billede_3.title} class="desktopImg">
                    </div>
                    
                </div>
                <div class="buttonContainer">
                    <a href="./galleriAlbum.html?id=${album.id}"><button>SE ALLE</button></a>
                </div>
            </article>`;
            return content;
        }

        data.forEach(album => {
            const content = renderAlbum(album);
            albumContainerEl.innerHTML += content;
        });
    })
    .catch((err) => {
        console.error("Something went wrong, try again later", err);
    });
