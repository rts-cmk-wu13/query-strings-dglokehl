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
        favoriteButton.forEach(btn => {
            btn.addEventListener("click", addToFavorite);
            if (localStorage.getItem(btn.getAttribute("id"))) {
                btn.classList.add("favorited");
            }
        });

        function addToFavorite() {
            if (this.classList.contains("favorited")) {
                this.classList.remove("favorited");
                localStorage.removeItem(this.getAttribute("id"), "favorite");
            } else {
                this.classList.add("favorited");
                localStorage.setItem(this.getAttribute("id"), "favorite");
            }
        }

    });