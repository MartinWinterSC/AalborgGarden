const calendarContainerEl = document.querySelector(".calendarContainer");
const nyhedContainerEl = document.querySelector(".newsContainer");

const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const category17 = "?categories=17&per_page=100";
const category13 = "?categories=13&per_page=100";

const fetchRequests = [
    fetch(baseURL + category17).then(res => res.json()),
    fetch(baseURL + category13).then(res => res.json())
];

Promise.all(fetchRequests)
    .then(data => {
        let category17Data = data[0];
        let category13Data = data[1];

        console.log("Category 1 Data:", category17Data);
        console.log("Category 2 Data:", category13Data);

        function isDatePassed(dateString) {
            const currentdate = new Date();
            const eventDate = new Date(dateString);
            return eventDate < currentdate;
        }

        function getMonthName(dateString) {
            const months = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
            const eventDate = new Date(dateString);
            const monthIndex = eventDate.getMonth();
            return months[monthIndex];
        }

        function renderEvent(event) {
            const { dato, event_navn, start_tid, slut_tid, placering, bemaerkning } = event.acf;
            const eventDate = new Date(dato);
            const monthName = getMonthName(dato);

            let content =
                `<article>
                    <a href="./kalender.html">
                        <div class="dateContainer">
                            <p class="weekday">${monthName}</p>
                            <p class="date">${eventDate.getDate()}</p>
                        </div>
                        <div class="eventInfoContainer">
                            <div class="articleTitle">
                                <h3>${event_navn}</h3>
                            </div>
                            <div class="articleDetails">
                                <div class="timePlaceContainer">
                                    <div class="time">
                                        <i class="fa-regular fa-clock"></i>
                                        <p>${start_tid} - ${slut_tid}</p>
                                    </div>
                                    <div class="place">
                                        <i class="fa-solid fa-location-dot"></i>
                                        <p>${placering}</p>
                                    </div>
                                </div>
                                <div class="remark">
                                    <p>Bemærkninger</p>
                                    <p><span>${bemaerkning}</span></p>
                                </div>
                            </div>
                        </div>
                    </a>
                </article>`;
            return content;
        }

        category17Data.sort((a, b) => new Date(a.acf.dato) - new Date(b.acf.dato));

        category17Data = category17Data.slice(0, 3);

        category17Data.forEach(event => {
            const content = renderEvent(event);
            calendarContainerEl.innerHTML += content;
        });

        function renderNyheder(nyhed) {
            const { nyhed_billede_1, upload_dato, titel } = nyhed.acf;

            let content = 
            `<article class="newsBig">
                <a href="./nyhedFocused.html?id=${nyhed.id}">
                    <img src="${nyhed_billede_1.url}" alt="${nyhed_billede_1.alt}" class="fullBodyImg">
                    <div class="newsInfo">
                        <h3>${titel}</h3>
                        <p>${upload_dato}</p>
                        <p class="readMore">LÆS MERE</p>
                    </div>
                </a>
            </article>`;
            return content;
        }

        category13Data = category13Data.slice(0, 3);

        category13Data.forEach(nyhed => {
            const content = renderNyheder(nyhed);
            nyhedContainerEl.innerHTML += content;
        });

    })
    .catch(err => {
        console.error("Error fetching data:", err);
    });
