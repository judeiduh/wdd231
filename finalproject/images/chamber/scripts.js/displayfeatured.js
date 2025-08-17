const sportLightCards = document.querySelector('.display-spotlight');

async function getMembershipData() {
    const file = 'data/members.json';
    const response = await fetch(file);
    const data = await response.json();

    sportLightCards.innerHTML = ''; // Clear existing contentsportLightCards.innerHTML = `<div>

    data.members.forEach(member => {
        if (member.level === 3) {
            sportLightCards.innerHTML += `
                <div class="spotlight-card">
                    <h4>${member.name}</h4>
                    <img src="${member.image}" alt="Image of ${member.name}" loading="lazy" width="64" height="64">
                    <p><strong>Contact:</strong> ${member.proprietor} from ${member.country}</p>
                    <p><strong>Found in:</strong> ${member.address}</p>
                    <p><strong>Span Reed ID#:</strong> ${member.phone}</p>
                    <a href="${member.URL}" target="_blank">Visit Website</a>
                    </div>`
        }
    });

    
}
getMembershipData();
