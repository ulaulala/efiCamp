const today = new Date();
const todayMonth = today.getMonth();
const todayYear = today.getFullYear();

const firstDay = new Date(todayYear, todayMonth, 1).getDay();
const firstDayOfNextMonth = new Date(todayYear, todayMonth + 1, 1);
const lastDay = new Date(firstDayOfNextMonth - 1).getDate();

var currentMonth = todayMonth;
var currentYear = todayYear;

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const daysContainer = document.querySelector('.daysContainer');

function generateCalendar(firstDay, lastDay) {
    const monthContainer = document.querySelector('.month');
    monthContainer.innerText = monthNames[currentMonth];
    const yearContainer = document.querySelector('.year');
    yearContainer.innerText = currentYear;

    if(firstDay === 0) {
        for(let i = 0; i < 6; i++) {
            let emptyDay = document.createElement('div');
            emptyDay.classList.add('day');
            emptyDay.classList.add('empty');
            daysContainer.appendChild(emptyDay);
        }
    }
    else {
        for(let i = 1; i < firstDay; i++) {
            let emptyDay = document.createElement('div');
            emptyDay.classList.add('day');
            emptyDay.classList.add('empty');
            daysContainer.appendChild(emptyDay);
        }
    }

    for(let i = 0; i < lastDay; i++) {
        let day = document.createElement('div');
        day.classList.add('day');
        day.innerText = i + 1;
        daysContainer.appendChild(day);
    }
    let tempDay = new Date(currentYear, currentMonth, lastDay).getDay();
    if(tempDay !== 0) {
        for(let i = 0; i < 7 - tempDay; i++) {
            let emptyDay = document.createElement('div');
            emptyDay.classList.add('day');
            emptyDay.classList.add('empty');
            daysContainer.appendChild(emptyDay);
        }
    }
}

generateCalendar(firstDay, lastDay);

const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');

function getPrevMonth(month, year) {
    while(daysContainer.hasChildNodes()) {
        daysContainer.removeChild(daysContainer.lastChild);
    }

    var newMonth, newYear;
    if(currentMonth !== 0) {
        newMonth = month - 1;
        newYear = year;
    }
    else {
        newMonth = 11;
        newYear = year - 1;
    }

    const firstDay = new Date(newYear, newMonth, 1).getDay();
    const firstDayOfNextMonth = new Date(newYear, newMonth + 1, 1);
    const lastDay = new Date(firstDayOfNextMonth - 1).getDate();

    currentMonth = newMonth;
    currentYear = newYear;

    generateCalendar(firstDay, lastDay);
}

function getNextMonth(month, year) {
    while(daysContainer.hasChildNodes()) {
        daysContainer.removeChild(daysContainer.lastChild);
    }

    var newMonth, newYear;
    if(currentMonth !== 11) {
        newMonth = month + 1;
        newYear = year;
    }
    else {
        newMonth = 0;
        newYear = year + 1;
    }

    const firstDay = new Date(newYear, newMonth, 1).getDay();
    const firstDayOfNextMonth = new Date(newYear, newMonth + 1, 1);
    const lastDay = new Date(firstDayOfNextMonth - 1).getDate();

    currentMonth = newMonth;
    currentYear = newYear;

    generateCalendar(firstDay, lastDay);
}

prevButton.addEventListener('click', function(event) {
    event.preventDefault();
    getPrevMonth(currentMonth, currentYear);
});
nextButton.addEventListener('click', function(event) {
    event.preventDefault();
    getNextMonth(currentMonth, currentYear);
});