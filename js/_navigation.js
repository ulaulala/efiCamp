const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('.search input');

const dashboardButtons = searchContainer.querySelectorAll('.dashboard-button');
const searchButton = dashboardButtons[1];
const logOutButton = dashboardButtons[2];
const searchCloseButton = document.querySelector('.search-container .search button');
const hamburgerMenuButton = document.querySelector('button.hamburger-menu');
const header = document.querySelector('header.fixed-bar');
const nav = document.querySelector('nav');

document.addEventListener("DOMContentLoaded", function(event) {
    searchButton.addEventListener('click', function(event) {
        if(window.innerWidth > 525) nav.style.display = 'none';

        searchContainer.classList.add('search-visible');
        searchContainer.classList.remove('search-hidden');
    });
    searchCloseButton.addEventListener('click', function(event) {
        nav.style.display = 'inline-block';

        searchContainer.classList.remove('search-visible');
        searchContainer.classList.add('search-hidden');
    });
    logOutButton.addEventListener('click', function(event) {
        window.location = 'index.html';
    });
    hamburgerMenuButton.addEventListener('click', function(event) {
        if(header.classList.contains('mobile-hidden')) {
            header.classList.add('mobile-visible');
            header.classList.remove('mobile-hidden');
        }
        else {
            header.classList.remove('mobile-visible');
            header.classList.add('mobile-hidden');
        }
    });
});
