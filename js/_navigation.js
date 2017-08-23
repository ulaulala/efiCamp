const searchContainer = document.querySelector('.search-container');
const search = document.querySelector('.search');
const searchInput = document.querySelector('.search input');
const searchButton = document.querySelectorAll('.search-container .dashboard-button')[1];
const searchCloseButton = document.querySelector('.search-container .search button');

const nav = document.querySelector('nav');

document.addEventListener("DOMContentLoaded", function(event) {
    searchButton.addEventListener('click', function(event) {
        nav.style.display = 'none';
        searchContainer.style.position = 'absolute';
        searchContainer.style.display = 'flex';
        search.style.display = 'flex';
        searchButton.style.display = 'none';
    });
    searchCloseButton.addEventListener('click', function(event) {
        nav.style.display = 'inline-block';
        searchContainer.style.position = 'relative';
        searchContainer.style.display = 'inline-block';
        search.style.display = 'none';
        searchButton.style.display = 'inline-block';
    });
});
