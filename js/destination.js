const root = document.querySelector("#root");

let search = window.location.search;
let params = new URLSearchParams(search);
let id = params.get("id");
// console.log("id: " + id);


fetch(`/data/${id}.json`)
    .then(response => response.json())
    .then(data => {
        let detailsMain = document.createElement("main");
        detailsMain.classList.add("details");

        detailsMain.innerHTML = `
            <figure class="details__img__container">
                <img class="details__img" src="img/${data.image}">

                <figcaption class="favorite__button favorite__button--details" data-fav="${data.id}">
                    <i class="fa-solid fa-heart details__favorite__icon"></i>FAVORIT
                </figcaption>
            </figure>

            <section class="details__text__container">
                <h3 class="details__location">${data.destination}</h3>
                <h1 class="details__headline">${data.title}</h1>
                <h2 class="details__subheadline">${data.subtitle}</h2>
                <p class="details__text">${data.text}</p>

                <ul class="details__list">
                    <li class="details__list__item--headline">Faciliteter</li>
                    ${data.facilities.map(facility => `
                        <li class="details__list__item">${facility}</li>
                    `).join("")}
                </ul>
            </section>
        `;
        root.append(detailsMain);


        favoriteButtonStorage()
    });