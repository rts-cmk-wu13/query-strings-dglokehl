const root = document.querySelector("#details");

let search = window.location.search;
let params = new URLSearchParams(search);
let id = params.get("id");
// console.log("id: " + id);


fetch(`/data/${id}.json`)
    .then(response => response.json())
    .then(data => {
        data.facilities.forEach(facility => {
            console.log(facility);
        });
        
        let detailsImgContainer = document.createElement("figure");
        detailsImgContainer.classList.add("details__img__container")

        let detailsImg = document.createElement("img");
        detailsImg.classList.add("details__img")
        detailsImg.setAttribute("src", `img/${data.image}`)

        let detailsFavorite = document.createElement("figcaption");
        detailsFavorite.classList.add("favorite__button", "favorite__button--details")
        detailsFavorite.innerHTML = `
            <i class="fa-solid fa-heart details__favorite__icon"></i>FAVORIT
        `

        detailsImgContainer.append(detailsImg, detailsFavorite);


        let detailsTextContainer = document.createElement("section");
        detailsTextContainer.classList.add("details__text__container")


        let detailsLocation = document.createElement("h3");
        detailsLocation.classList.add("details__location")
        detailsLocation.innerHTML = data.destination;

        let detailsHeadline = document.createElement("h1");
        detailsHeadline.classList.add("details__headline")
        detailsHeadline.innerHTML = data.title;

        let detailsSubheadline = document.createElement("h2");
        detailsSubheadline.classList.add("details__subheadline")
        detailsSubheadline.innerHTML = data.subtitle;

        let detailsText = document.createElement("p");
        detailsText.classList.add("details__text")
        detailsText.innerHTML = data.text;


        let detailsFacilities = document.createElement("ul");
        detailsFacilities.classList.add("details__list")

        let detailsFacilitiesHeadline = document.createElement("li");
        detailsFacilitiesHeadline.classList.add("details__list__item--headline")
        detailsFacilitiesHeadline.innerHTML = "Faciliteter"

        detailsFacilities.innerHTML = data.facilities.map(facility => `
            <li class="details__list__item">${facility}</li>
        `).join("");

        detailsFacilities.prepend(detailsFacilitiesHeadline);


        detailsTextContainer.append(detailsLocation, detailsHeadline, detailsSubheadline, detailsText, detailsFacilities);

        details.append(detailsImgContainer, detailsTextContainer);
    });