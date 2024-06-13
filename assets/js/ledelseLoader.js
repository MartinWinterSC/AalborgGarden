const ledelseContainerEl = document.querySelector(".ledelseContainer")

const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const urlCategory = "?categories=10&per_page=100";

fetch(baseURL + urlCategory)
.then((res) => res.json())
.then((data) => {
    console.log(data)
    data.reverse();

    function renderLedelse(personal){
        const {specifikke_rolle, navn, telefonnr, email, portraet} = personal.acf;
        let content = `<div>
        <h3>${specifikke_rolle}</h3>`;
        if (portraet && portraet.url) {
            content += `<img src="${portraet.url}" alt="${portraet.alt}">`;
        } else {
            content += `<img src="./assets/img/placeholder.jpg" alt="Denne person er ikke fotogen">`
        }
        content += `<p>${navn}</p>`;
        if (telefonnr) {
            content += `<p>TLF: ${telefonnr}</p>`;
        }
        if (email) {
            content += `<p class="email">${email}</p>`;
        }
        content += `</div>`;
        return content;
    }
    data.forEach(personal => {
        const content = renderLedelse(personal);
        ledelseContainerEl.innerHTML += content;
    });
})
.catch((err) => {
    console.error("Something went wrong, try again later", err);
});