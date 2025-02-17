const root = document.querySelector("#details");

let search = window.location.search;
let params = new URLSearchParams(search);
let id = params.get("id");
// console.log("id: " + id);


fetch(`/data/${id}.json`)
    .then(response => response.json())
    .then(data => {
        let detailsImgContainer = document.createElement("figure");
        detailsImgContainer.classList.add("details__img__container");

        let detailsImg = document.createElement("img");
        detailsImg.classList.add("details__img");
        detailsImg.setAttribute("src", `img/${data.image}`);

        let detailsFavorite = document.createElement("figcaption");
        detailsFavorite.classList.add("favorite__button", "favorite__button--details");
        detailsFavorite.setAttribute("id", `fav${data.id}`);
        detailsFavorite.innerHTML = `
            <i class="fa-solid fa-heart details__favorite__icon"></i>FAVORIT
        `;

        detailsImgContainer.append(detailsImg, detailsFavorite);


        let detailsTextContainer = document.createElement("section");
        detailsTextContainer.classList.add("details__text__container");


        let detailsLocation = document.createElement("h3");
        detailsLocation.classList.add("details__location");
        detailsLocation.innerHTML = data.destination;

        let detailsHeadline = document.createElement("h1");
        detailsHeadline.classList.add("details__headline");
        detailsHeadline.innerHTML = data.title;

        let detailsSubheadline = document.createElement("h2");
        detailsSubheadline.classList.add("details__subheadline");
        detailsSubheadline.innerHTML = data.subtitle;

        let detailsText = document.createElement("p");
        detailsText.classList.add("details__text");
        detailsText.innerHTML = data.text;


        let detailsFacilities = document.createElement("ul");
        detailsFacilities.classList.add("details__list");

        let detailsFacilitiesHeadline = document.createElement("li");
        detailsFacilitiesHeadline.classList.add("details__list__item--headline");
        detailsFacilitiesHeadline.innerHTML = "Faciliteter";

        detailsFacilities.innerHTML = data.facilities.map(facility => `
            <li class="details__list__item">${facility}</li>
        `).join("");

        detailsFacilities.prepend(detailsFacilitiesHeadline);


        detailsTextContainer.append(detailsLocation, detailsHeadline, detailsSubheadline, detailsText, detailsFacilities);

        details.append(detailsImgContainer, detailsTextContainer);


        let favoriteButton = document.querySelectorAll(".favorite__button");

        let favoriteArray = [];

        favoriteButton.forEach(btn => {
            btn.addEventListener("click", favoriteAddRemove);

            if (readFromLocalStorage("favorites") !== null) {
                favoriteArray = readFromLocalStorage("favorites");
            }

            if (favoriteArray.includes(btn.getAttribute("id"))) {
                btn.classList.add("favorited");
            }
        });

        function favoriteAddRemove() {
            if (this.classList.contains("favorited")) {
                this.classList.remove("favorited");

                deleteFromLocalStorage("favorites", this.getAttribute("id"));
            } else {
                this.classList.add("favorited");

                saveToLocalStorage("favorites", this.getAttribute("id"));
            }
        };

        function saveToLocalStorage(key, value) {
            favoriteArray.push(value);

            return localStorage.setItem(key, JSON.stringify(favoriteArray));
        };

        function readFromLocalStorage(key) {
            return JSON.parse(localStorage.getItem(key));
        };

        function deleteFromLocalStorage(key, value) {
            favoriteArray.splice(favoriteArray.indexOf(value), 1);

            return localStorage.setItem(key, JSON.stringify(favoriteArray));
        };
    });


function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);

    let string = `${key} saved to localStorage as ${value}`;
    return string;
};

function readFromLocalStorage(key) {
    localStorage.getItem(key);

    let string = `key: ${key} - value: ${localStorage.getItem(key)}`;
    return string;
};

function deleteFromLocalStorage(key) {
    localStorage.removeItem(key);

    let string = `${key} removed from localStorage`;
    return string;
};