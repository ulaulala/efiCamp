const checkbox = document.querySelector('input#on-off');
const chart = document.querySelector('.main-chart');

checkbox.addEventListener('click', function(event) {
    if(checkbox.checked) {
        chart.classList.add('visible');
        chart.classList.remove('hidden');
    }
    else {
        chart.classList.add('hidden');
        chart.classList.remove('visible');
    }
});