const eventContainerEl = document.querySelector(".calendarContainer");

const baseURL = "https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts";
const urlCategory = "?categories=17&per_page=100";

fetch(baseURL + urlCategory)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

        function isDatePassed(dateString){
            const currentdate = new Date();
            const eventDate = new Date(dateString);
            return eventDate < currentdate;
        }

        function getMonthName(dateString){
            const months = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
            const eventDate = new Date(dateString);
            const monthIndex = eventDate.getMonth();
            return months[monthIndex];
        }

        function renderEvent(event){
            const{dato, event_navn, start_tid, slut_tid, placering, bemaerkning} = event.acf;
            const eventDate = new Date(dato);
            const monthName = getMonthName(dato)

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

        data.sort((a, b) => new Date(a.acf.dato) - new Date(b.acf.dato));

        data.forEach(event => {
            const content = renderEvent(event);
            eventContainerEl.innerHTML += content;
        });
    })
    .catch((err) => {
        console.error("Something went wrong, try again later", err);
    });