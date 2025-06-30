// Set the current year in the footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Toggle contact info visibility
const contactButton = document.getElementById('contactButton');
const contactInfo = document.getElementById('contactInfo');

contactButton.addEventListener('click', () => {
    contactInfo.classList.toggle('hidden');

    // Optional: change button text
    if (contactInfo.classList.contains('hidden')) {
        contactButton.textContent = "Contact Me";
    } else {
        contactButton.textContent = "Hide Contact Info";
    }
})
document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("contactButton");
    const info = document.getElementById("contactInfo");

    button.addEventListener("click", () => {
        info.classList.toggle("hidden");
    });
});