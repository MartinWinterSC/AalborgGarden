const nyhedContainerEl = document.querySelector(".nyhedContainer");

const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const urlCategory = "?categories=13&per_page=100";

fetch(baseURL + urlCategory)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

        function limitText(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + "...";
            }
            return text;
        }

        function renderNyheder(nyhed){
            const{nyhed_billede_1, upload_dato, titel, nyhed_tekst} = nyhed.acf;
            
            const limitedText = limitText(nyhed_tekst, 75);

            let content = 
            `<article class="newsBig">
                <a href="./nyhedFocused.html?id=${nyhed.id}">
                    <img src="${nyhed_billede_1.url}" alt="${nyhed_billede_1.alt}" class="fullBodyImg">
                    <div class="articleContent">
                        <p>${upload_dato}</p>
                        <h2>${titel}</h2>
                        <p>${limitedText}</p>
                        <p class="readMore">LÆS MERE</p>
                    </div>
                </a>
            </article>`;
            return content;
        }

        data.forEach(nyhed => {
            const content = renderNyheder(nyhed);
            nyhedContainerEl.innerHTML += content;
        });
    })
.catch((err) => {
    console.error("Something went wrong, try again later", err);
});