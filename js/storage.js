let favoriteArray = [];

function favoriteButtonStorage() {
    let favoriteButtons = document.querySelectorAll(".favorite__button");

    favoriteButtons.forEach(btn => {
        btn.addEventListener("click", favoritesAddRemove);

        if (readFromLocalStorage("favorites") !== null) {
            favoriteArray = readFromLocalStorage("favorites");

            if (favoriteArray.includes(btn.getAttribute("data-fav"))) {
                btn.classList.add("favorited");
            }
        } else {
            favoriteArray = [];
        }
    });
    console.log("Favorites:", favoriteArray);
}


function favoritesAddRemove() {
    let dataFav = this.getAttribute("data-fav");

    if (this.classList.contains("favorited")) {
        this.classList.remove("favorited");

        favoriteArray.splice(favoriteArray.indexOf(dataFav), 1);
        deleteFromLocalStorage("favorites", favoriteArray);
    } else {
        this.classList.add("favorited");

        favoriteArray.push(dataFav);
        saveToLocalStorage("favorites", favoriteArray);
    }
    console.log(favoriteArray);
};



/**
 * 
 * @param {string} key 
 * @param {any | any[]} value 
 * @returns {string}
 */

function saveToLocalStorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
};


/**
 * 
 * @param {string} key 
 * @param {any | any[]} value 
 * @returns {string}
 */

function deleteFromLocalStorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
};


/**
 * 
 * @param {string} key 
 * @param {any | any[]} value 
 * @returns {string}
 */

function readFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
};