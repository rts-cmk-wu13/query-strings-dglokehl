let favoriteArray = [];


function favoritesAddRemove() {
    if (this.classList.contains("favorited")) {
        this.classList.remove("favorited");

        deleteFromLocalStorage("favorites", this.getAttribute("data-fav"));
    } else {
        this.classList.add("favorited");

        saveToLocalStorage("favorites", this.getAttribute("data-fav"));
    }
};


function saveToLocalStorage(key, value) {
    favoriteArray.push(value);
    console.log(favoriteArray);

    return localStorage.setItem(key, JSON.stringify(favoriteArray));
};

function deleteFromLocalStorage(key, value) {
    favoriteArray.splice(favoriteArray.indexOf(value), 1);
    console.log(favoriteArray);

    return localStorage.setItem(key, JSON.stringify(favoriteArray));
};

function readFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
};