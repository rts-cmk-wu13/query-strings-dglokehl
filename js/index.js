const root = document.querySelector("#root");

fetch("/data/destinations.json")
    .then(response => response.json())
    .then(data => {
        let destinationsSection = document.createElement("section");
        destinationsSection.classList.add("destinations");

        let destinationsHeadline = document.createElement("h1");
        destinationsHeadline.classList.add("destinations__headline");
        destinationsHeadline.textContent = "Apartments for rent";

        let destinationsContainer = document.createElement("div");
        destinationsContainer.classList.add("destinations__container");

        destinationsContainer.innerHTML = data.destinations.map(card => `
            <article class="destinations__card">
                <a href="destination.html?id=${card.id}" class="destinations__card__img__container">
                    <img src="img/${card.image}" alt="${card.title}">
                </a>

                <div class="destinations__card__caption">
                    <i class="fa-solid fa-heart favorite__button" id="fav${card.id}"></i>
                    <a href="destination.html?id=${card.id}" class="destinations__card__link">MORE</a>
                </div>
            </article>
        `).join("");

        destinationsSection.append(destinationsHeadline, destinationsContainer);
        root.append(destinationsSection);


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




// GAMMEL LØSNING:

// favoriteButton.forEach(btn => {
//     btn.addEventListener("click", favoriteAddRemove);
//     if (readFromLocalStorage(btn.getAttribute("id"))) {
//         btn.classList.add("favorited");
//         console.log(readFromLocalStorage(btn.getAttribute("id")));
//     }
// });

// function favoriteAddRemove() {
//     if (this.classList.contains("favorited")) {
//         this.classList.remove("favorited");
//         deleteFromLocalStorage(this.getAttribute("id"));
//         console.log(deleteFromLocalStorage(this.getAttribute("id")));
//     } else {
//         this.classList.add("favorited");
//         saveToLocalStorage(this.getAttribute("id"), "favorite");
//         console.log(saveToLocalStorage(this.getAttribute("id"), "favorite"));
//     }
// };


// function saveToLocalStorage(key, value) {
// localStorage.setItem(key, value);

// let string = `${key} saved to localStorage as ${value}`;
// return string;
// };

// function readFromLocalStorage(key) {
// localStorage.getItem(key);

// return localStorage.getItem(key);
// };

// function deleteFromLocalStorage(key) {
// localStorage.removeItem(key);

// let string = `${key} removed from localStorage`;
// return string;
// };