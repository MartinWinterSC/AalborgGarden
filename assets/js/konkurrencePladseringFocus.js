const focusedKonkurrencePlaceringEl = document.querySelector(".focusedKonkurrencePlacering");

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const contentID = params.get('id');

    fetch(`https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts/${contentID}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            const renderFocusedKonkurrencePlacering =
            `<div class="contentContainer">
                <div class="textContainer">
                    <p>
                        Aalborg Garden deltager hvert andet år i Danmarks mesterskaberne, som foregår i forskellige byer rundt i Danmark. Herunder kan du se placeringer for nogle udvalgte Danmarks mesterskaber:
                    </p>
                    <img src="${data.acf.konkurrence_logo.url}" alt="${data.acf.konkurrence_logo.alt}" class="fullBodyImg mobileImg">
                    <p>${data.acf.konkurrence_intro}.</p>
                    <p>
                        Resultatliste: ${data.acf.konkurrence_navn}
                    </p>
                    <ul>
                        <li>Tattoo/show: ${data.acf.tattoo_pladsering}. plads</li>
                        <li>Tambourmajor - tattoo: ${data.acf.tambourmajor_tattoo_pladsering}. plads</li>
                        <li>Bymarch: ${data.acf.bymarch_pladsering}. plads</li>
                        <li>Tambourmajor - bymarch: ${data.acf.tambourmajor_bymarch_pladsering}. plads</li>
                        <li>Koncert - tambourkorps: ${data.acf.koncert_tambourkorps_pladsering}. plads</li>
                        <li>Koncert - brass band: ${data.acf.koncert_brass_band_pladsering}. plads</li>
                        <li>Samlet danmarksmester: ${data.acf.samlet_danmarksmester_pladsering}. plads</li>
                    </ul>
                </div>
                <img src="${data.acf.konkurrence_logo.url}" alt="${data.acf.konkurrence_logo.alt}" class="fullBodyImg desktopImg">
            </div>`;

            focusedKonkurrencePlaceringEl.innerHTML = renderFocusedKonkurrencePlacering;
        })

        .catch((err) => {
            console.error("Something went wrong, try again later", err);
        });
});
