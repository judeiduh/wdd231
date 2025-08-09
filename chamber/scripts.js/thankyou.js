document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Display submitted information
    const detailsContainer = document.getElementById('applicationDetails');
    
    if (urlParams.has('firstName')) {
        let html = `
            <p><strong>Name:</strong> ${urlParams.get('firstName')} ${urlParams.get('lastName')}</p>
            <p><strong>Email:</strong> ${urlParams.get('email')}</p>
            <p><strong>Phone:</strong> ${urlParams.get('phone')}</p>
            <p><strong>Business Name:</strong> ${urlParams.get('business')}</p>
        `;
        
        if (urlParams.has('title')) {
            html += `<p><strong>Title:</strong> ${urlParams.get('title')}</p>`;
        }
        
        if (urlParams.has('membership')) {
            const membership = urlParams.get('membership');
            let membershipText = '';
            switch(membership) {
                case 'np':
                    membershipText = 'NP Membership (Non-Profit)';
                    break;
                case 'bronze':
                    membershipText = 'Bronze Membership';
                    break;
                case 'silver':
                    membershipText = 'Silver Membership';
                    break;
                case 'gold':
                    membershipText = 'Gold Membership';
                    break;
                default:
                    membershipText = membership;
            }
            html += `<p><strong>Membership Level:</strong> ${membershipText}</p>`;
        }
        
        if (urlParams.has('timestamp')) {
            const timestamp = new Date(urlParams.get('timestamp'));
            html += `<p><strong>Application Date:</strong> ${timestamp.toLocaleDateString()}</p>`;
            html += `<p><strong>Application Time:</strong> ${timestamp.toLocaleTimeString()}</p>`;
        }
        
        detailsContainer.innerHTML = html;
    } else {
        detailsContainer.innerHTML = '<p>No application data found.</p>';
    }
    
    // Set current year and last modified date
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});