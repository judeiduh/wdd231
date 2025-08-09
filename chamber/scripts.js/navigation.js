
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.navigation');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});
