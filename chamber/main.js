// main.js - Common JavaScript for all pages

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    setCurrentYear();
    
    // Set last modified date
    setLastModifiedDate();
    
    // Initialize mobile menu functionality
    initMobileMenu();
    
    // For thank you page specifically
    if (document.querySelector('.thankyou-main')) {
        displaySubmittedData();
    }
});

// Function to set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Function to set last modified date
function setLastModifiedDate() {
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }
}

// Function to initialize mobile menu
function initMobileMenu() {
    const menuButton = document.getElementById('menu');
    const navigation = document.querySelector('nav ul');
    
    if (menuButton && navigation) {
        menuButton.addEventListener('click', function() {
            navigation.classList.toggle('show');
            // Change menu icon based on state
            this.textContent = navigation.classList.contains('show') ? '✕' : '☰';
        });
    }
}

// Function to display submitted form data (for thank you page)
function displaySubmittedData() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Display basic information
    displayField('firstName', 'displayFirstName', urlParams);
    displayField('lastName', 'displayLastName', urlParams);
    displayField('email', 'displayEmail', urlParams);
    displayField('phone', 'displayPhone', urlParams);
    displayField('businessName', 'displayBusinessName', urlParams);
    
    // Display formatted membership level
    const membershipLevel = urlParams.get('membershipLevel');
    const membershipDisplay = formatMembershipLevel(membershipLevel);
    document.getElementById('displayMembershipLevel').textContent = membershipDisplay;
    
    // Display formatted timestamp
    const timestamp = urlParams.get('timestamp');
    if (timestamp) {
        const formattedDate = formatTimestamp(timestamp);
        document.getElementById('displayTimestamp').textContent = formattedDate;
    } else {
        document.getElementById('displayTimestamp').textContent = 'Not available';
    }
}

// Helper function to display form fields
function displayField(paramName, elementId, urlParams) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = urlParams.get(paramName) || 'Not provided';
    }
}

// Helper function to format membership level
function formatMembershipLevel(level) {
    if (!level) return 'Not provided';
    
    const levels = {
        'np': 'NP Membership (Non-Profit)',
        'bronze': 'Bronze Membership',
        'silver': 'Silver Membership',
        'gold': 'Gold Membership'
    };
    
    return levels[level] || level;
}

// Helper function to format timestamp
function formatTimestamp(timestamp) {
    try {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (e) {
        console.error('Error formatting timestamp:', e);
        return 'Not available';
    }
}