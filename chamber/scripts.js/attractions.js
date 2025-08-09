// Fetch and display attraction cards from JSON data
fetch('data/attractions.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('attractions-container');
        
        data.forEach(attraction => {
            const card = document.createElement('div');
            card.className = 'attraction-card';
            card.innerHTML = `
                <figure>
                    <img src="${attraction.image}" 
                         data-src="${attraction.image}" 
                         alt="${attraction.alt}" 
                         loading="lazy" 
                         width="400" 
                         height="300">
                    <figcaption>${attraction.name}</figcaption>
                </figure>
                <div class="card-content">
                    <p class="address">${attraction.address}</p>
                    <p class="description">${attraction.description}</p>
                    <button class="learn-more">Learn More</button>
                </div>
            `;
            container.appendChild(card);
        });
        
        // Initialize lazy loading
        const images = document.querySelectorAll('img[data-src]');
        const imgOptions = {
            threshold: 0,
            rootMargin: "0px 0px 50px 0px"
        };
        
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            });
        }, imgOptions);
        
        images.forEach(image => {
            imgObserver.observe(image);
        });
    })
    .catch(error => console.error('Error loading attractions:', error));