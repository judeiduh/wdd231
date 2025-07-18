const file = 'data/members.json';
const cards = document.querySelector('#membership-cards');

async function getMembershipData() {
    const response = await fetch(file);
    const data = await response.json();
    //console.table(data.members);
    displayMembers(data.members);
}

getMembershipData();

const displayMembers = (members) => {
    members.forEach(member => {
        let card = document.createElement('section');
        let businessName = document.createElement('h2');
        let address = document.createElement('p');
        let spanReed = document.createElement('p');
        let proprietor = document.createElement('p');
        let icon = document.createElement('img');
        let website = document.createElement('a');

        businessName.textContent = member.name;
        icon.setAttribute('src', `${member.image}`);
        icon.setAttribute('alt', `Icon for ${member.name} provided by Icons8`);
        icon.setAttribute('loading', 'lazy');
        icon.setAttribute('width', '64');
        icon.setAttribute('height', '64');
        address.innerHTML = `<strong>Found in:</strong> ${member.address}`;
        spanReed.innerHTML = `<strong>Span Reed ID#:</strong> ${member.phone}`;
        proprietor.innerHTML = `<strong>Contact:</strong> ${member.proprietor} from ${member.country}`;
        website.setAttribute('href', '#');
        website.textContent = member.URL;

        card.appendChild(businessName);
        card.appendChild(icon);
        card.appendChild(address);
        card.appendChild(spanReed);
        card.appendChild(proprietor);
        card.appendChild(website);
        cards.appendChild(card);
    });
}