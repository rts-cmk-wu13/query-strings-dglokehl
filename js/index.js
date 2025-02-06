const destinationsSection = document.querySelector(".destinations");

let indexHeadline = document.createElement("h1");
indexHeadline.textContent = "Apartments for rent";

fetch("/data/destinations.json")
    .then(response => response.json())
    .then(data => {
        let destinationContainer = document.createElement("div");
        destinationContainer.classList.add("destinations__container");
        destinationContainer.innerHTML = data.destinations.map(card => `
            <article class="destinations__card">
                <img src="img/${card.image}" alt="${card.title}" class="destinations__card__img">
                <div class="destinations__card__text">
                    <i class="fa-solid fa-heart"></i>
                    <span>MORE</span>
                </div>
            </article>
        `).join("");

        destinationsSection.append(indexHeadline, destinationContainer);
    });