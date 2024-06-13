const albumContainerEl = document.querySelector(".albumContainer")

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const contentID = params.get('id');

    fetch(`https://aalborggarden.martinwinther.dk/wp-json/wp/v2/posts/${contentID}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);


            const renderAlbumContainer =
            `<img src="${data.acf.billede_1.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_2.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_3.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_4.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_5.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_6.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_7.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_8.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_9.link}" alt="" class="fullBodyImg">
            <img src="${data.acf.billede_10.link}" alt="" class="fullBodyImg">`

            albumContainerEl.innerHTML = renderAlbumContainer;
        })

        .catch((err) => {
            console.error("Something went wrong, try again later", err);
        });
});