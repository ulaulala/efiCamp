const historyContainer = document.querySelector('ul.history-container');
const filterSelect = document.querySelector('#history-filter');
const historySearchInput = document.querySelector('#history-search');
const filterOptions = filterSelect.querySelectorAll('option');

historyInit();

filterSelect.addEventListener('change', function(event) {
    for(let i = 0; i < filterOptions.length; i++) {
        if(filterOptions[i].selected) {
            filterBy(filterOptions[i].value, historySearchInput.value);
        }
    }
});

historySearchInput.addEventListener('keyup', function(event) {
    for(let i = 0; i < filterOptions.length; i++) {
        if (filterOptions[i].selected && filterOptions[i].value !== 'none') {
            filterBy(filterOptions[i].value, this.value);
        }
        else if (historySearchInput.value === '' || !historySearchInput.value) {
            historyInit();
        }
    }
});

function filterBy(type, inputText) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "https://efigence-camp.herokuapp.com/api/data/history",
        error: function(response) {
            console.log(response);
        },
        success: function(response) {
            clearChildNodes(historyContainer);

            for (let i = 0; i < response.content.length; i++) {
                inputText = inputText.toLowerCase();
                let splitString;
                switch (type) {
                    case 'category':
                        splitString = response.content[i].category.toLowerCase();
                        break;
                    case 'currency':
                        splitString = response.content[i].currency.toLowerCase();
                        break;
                    case 'details':
                        splitString = response.content[i].description.toLowerCase();
                        break;
                    case 'date':
                        splitString = response.content[i].date;
                        break;
                    default:
                        historyInit();
                }

                if(type !== 'none') {
                    type === 'date'? splitString = splitString.split('-') : splitString = splitString.split(' ');

                    for (let j = 0; j < splitString.length; j++) {
                        if((type === 'date' && splitString[j].includes(inputText)) || splitString[j].startsWith(inputText)) {
                            var historyElement = document.createElement('li');
                            historyElement.innerHTML = getHistoryTemplate(response.content[i]);
                            historyContainer.appendChild(historyElement);

                            break;
                        }
                    }
                }
            }
            $(window).unbind('scroll');
        }
    });
}