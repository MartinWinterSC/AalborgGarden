const sponsorContainerEl = document.querySelector(".sponsorContainer");

const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const urlCategory = "?categories=12&per_page=100";

fetch(baseURL + urlCategory)
.then((res) => res.json())
.then((data) => {
    console.log(data)

    function renderSponsor(sponsor){
        const {virksomhed_billede, virksomhed_navn, beloeb, donations_genstand} = sponsor.acf;
        let content = `<div class="sponsorInfo">
            <img src="${virksomhed_billede.url}" alt="${virksomhed_billede.alt}" class="fullBodyImg">
            <h2>${virksomhed_navn}: ${beloeb},-</h2>
            <p>${donations_genstand}</p>
        </div>`;
        
        return content;
    }
    data.forEach(sponsor => {
        const content = renderSponsor(sponsor);
        sponsorContainerEl.innerHTML += content;
    });
})
.catch((err) => {
    console.error("Something went wrong, try again later", err);
});