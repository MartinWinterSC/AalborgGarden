const competitionContainerEl = document.querySelector(".competitionContainerSuper");

const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const urlCategory = "?categories=18&per_page=100";

fetch(baseURL + urlCategory)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        function renderCompetition(competition) {
            const { konkurrence_navn, konkurrence_logo } = competition.acf;

            let content =
                `<article class="competitionContainer">
                    <div>
                        <h2>${konkurrence_navn}</h2>
                        <img src="${konkurrence_logo.url}" alt="${konkurrence_logo.title}" class="fullBodyImg">
                    </div>
                    <div class="buttonContainer">
                        <a href="./placeringFocused.html?id=${competition.id}"><button>Se placering</button></a>
                    </div>
                </article>`;

            return content;
        }

        let allCompetitionContent = "";

        data.forEach((competition) => {
            const content = renderCompetition(competition);
            allCompetitionContent += content;
        });

        competitionContainerEl.innerHTML = allCompetitionContent;
    })
    .catch((err) => {
        console.error("Something went wrong, try again later", err);
    });
