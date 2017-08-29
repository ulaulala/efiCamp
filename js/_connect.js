function getSummary(endpoint, containers) {
    const balance = document.querySelector(containers.balance);
    const funds = document.querySelector(containers.funds);
    const payments = document.querySelector(containers.payments);

    $.ajax({
        type: "get",
        dataType: "json",
        url: "https://efigence-camp.herokuapp.com/api/" + endpoint,
        error: function(response) {
            console.log(response);
        },
        success: function(response) {
            balance.innerText = response.content[0].balance.toFixed(2);
            funds.innerText = response.content[0].funds.toFixed(2);
            payments.innerText = response.content[0].payments.toFixed(2);
        }
    });
}

const containers = {    /*selectors to place data*/
  balance: '#balance',
  funds: '#funds',
  payments: '#payments'
};

getSummary('data/summary', containers);

function getProductsTemplate(responseObject) {
    return  `<div class="product-container">
               <img src="img/dashboard/`+ responseObject.type.replace(" ", "-") +`.svg">
                 <div>
                   <p>` + responseObject.type +`</p>
                   <p>` + responseObject.amount.toFixed(2) + ` ` + responseObject.currency + `</p>
                 </div>
             </div>`;
}

function getProducts(endpoint) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "https://efigence-camp.herokuapp.com/api/" + endpoint,
        error: function(response) {
            console.log(response);
        },
        success: function(response) {
            var productsContainer = document.getElementById('products');
            for(var i = 0; i < response.content.length; i++) {
                var columnDiv = document.createElement('div');
                columnDiv.className += 'column small-12 medium-6';
                columnDiv.innerHTML = getProductsTemplate(response.content[i]);
                productsContainer.appendChild(columnDiv);
            }
        }
    });
}

getProducts("data/products");

function getHistoryTemplate(responseObject) {   /*do refactor after API error fixing*/
    var options = {
        'day': 'numeric',
        'month': '2-digit'
    };
    return `<div class="date">` + new Date(responseObject.date).toLocaleDateString('pl', options) +`</div>
                 <div class="details">
                    <p class="correspondent">` + responseObject.description + `</p>
                    <p class="type">
                      ` + responseObject.category + `
                      <button class="down">
                        <i class="material-icons">expand_more</i>
                      </button>
                    </p>
                 </div>
            <div class="payment"><b>` + responseObject.amount.toFixed(2) + `</b> ` + responseObject.currency + `</div>`;
}


function getHistory(endpoint) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "https://efigence-camp.herokuapp.com/api/" + endpoint,
        error: function(response) {
            console.log(response);
        },
        success: function(response) {
            var historyContainer = document.querySelector('ul.history-container');
            for(var i = 0; i < response.content.length; i++) {
                var historyElement = document.createElement('li');
                historyElement.innerHTML = getHistoryTemplate(response.content[i]);
                historyContainer.appendChild(historyElement);
            }
        }
    });
}

getHistory("data/history");