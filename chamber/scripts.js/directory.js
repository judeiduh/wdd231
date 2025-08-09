const gridbutton = document.querySelector("#grid-button");
const listbutton = document.querySelector("#list-button");
const display = document.querySelector("#membership-cards");

gridbutton.addEventListener("click", () => {
    display.classList.remove("member-list");
    display.classList.add("member-grid");
});

listbutton.addEventListener("click", () => {
    display.classList.remove("member-grid");
    display.classList.add("member-list");
});