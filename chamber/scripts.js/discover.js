// Load JSON data and create cards
async function loadDiscoverData() {
    const response = await fetch('data/discover.json');
    const items = await response.json();

    const container = document.getElementById('discoverCards');
    container.innerHTML = ''; // clear before appending

    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.gridArea = `card${index+1}`;

        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
                <img src="${item.image}" alt="${item.title}" loading="lazy" width="300" height="200">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
        `;

        container.appendChild(card);
    });
}

// LocalStorage Visitor Message
function displayVisitorMessage() {
    const messageDiv = document.getElementById('visitorMessage');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!lastVisit) {
        messageDiv.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysDiff = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysDiff < 1) {
            messageDiv.textContent = "Back so soon! Awesome!";
        } else if (daysDiff === 1) {
            messageDiv.textContent = `You last visited 1 day ago.`;
        } else {
            messageDiv.textContent = `You last visited ${daysDiff} days ago.`;
        }
    }

    localStorage.setItem('lastVisit', now);
}

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Run functions
displayVisitorMessage();
loadDiscoverData();



