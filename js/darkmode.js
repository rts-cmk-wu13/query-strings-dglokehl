let darkmodeContainer = document.createElement("span");
darkmodeContainer.classList.add("darkmode");
darkmodeContainer.innerHTML = `
    <label for="darkmode__switch">Dark Mode:</label>
    <input type="checkbox" switch name="darkmode__switch" id="darkmode__switch">
`
root.append(darkmodeContainer);


let docElm = document.documentElement;

let switchElm = document.querySelector("#darkmode__switch");
switchElm.addEventListener("change", function () {
    if (switchElm.checked) {
        docElm.setAttribute("data-dark", switchElm.checked);
    } else {
        docElm.setAttribute("data-dark", switchElm.checked);
    }
    saveToLocalStorage("isDarkMode", switchElm.checked);
    console.log(readFromLocalStorage("isDarkMode"));
});


let isDarkMode = readFromLocalStorage("isDarkMode");
let browserDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

console.log("darkmode matchMedia", browserDark);
console.log("darkmode localStorage", isDarkMode);


if (browserDark) {
    if (isDarkMode || isDarkMode == null) {
        switchElm.checked = true;
    } else {
        switchElm.checked = false;
    }
    docElm.setAttribute("data-dark", switchElm.checked)
} else {
    switchElm.checked = false;
    docElm.setAttribute("data-dark", switchElm.checked)
}