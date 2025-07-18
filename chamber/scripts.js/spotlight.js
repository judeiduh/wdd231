const file = 'data/members.json';
const cards = document.querySelector("#spotlight-cards");

async function getSpotlightData() {
    const response = await fetch(file);
    const data = await response.json();
    // console.table(data.members);
    const selectedMembers = selectRandomMembers(data.members);
    // console.log(selectedMembers);
    displaySelectedMembers(selectedMembers);
}

function selectRandomMembers(memberList) {
    const goldMembers = memberList.filter(member => member.level === "gold");
    const silverMembers = memberList.filter(member => member.level === "silver");

    const selectedGold = [];
    const goldCopy = [...goldMembers];

    const randomGold1 = Math.floor(Math.random() * goldCopy.length);
    selectedGold.push(goldCopy[randomGold1]);
    goldCopy.splice(randomGold1, 1);

    const randomGold2 = Math.floor(Math.random() * goldCopy.length);
    selectedGold.push(goldCopy[randomGold2]);

    const randomSilver = Math.floor(Math.random() * silverMembers.length);
    const selectedSilver = silverMembers[randomSilver];

    return [...selectedGold, selectedSilver];
}

const displaySelectedMembers = (members) => {
    members.forEach(member => {
        let card = document.createElement('section');
        let businessName = document.createElement('h2');
        let address = document.createElement('p');
        let spanReed = document.createElement('p');
        let proprietor = document.createElement('p');
        let icon = document.createElement('img');
        let website = document.createElement('a');

        businessName.textContent = member.name;
        icon.setAttribute('src', member.image);
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

getSpotlightData();