var paymentsData = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0
};

$.ajax({
    type: "get",
    dataType: "json",
    url: "https://efigence-camp.herokuapp.com/api/data/history",
    error: function(response) {
        console.log("chart: " + response);
    },
    success: function(response) {
        for(var i = 0; i < response.content.length; i++) {
            var date = new Date(response.content[i].date);
            if(response.content[i].status === 'income') {
                paymentsData[Object.keys(paymentsData)[date.getMonth()]] += response.content[i].amount;
            }
            else {
                paymentsData[Object.keys(paymentsData)[date.getMonth()]] -= response.content[i].amount;
            }
        }
        drawMainChart(paymentsData);
    }
});

function drawMainChart(data) {
    var ctx = document.querySelector('canvas').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [
                {
                    label: "",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45150", "#3e15cd", "#8e1ea2", "#3cb19f"],
                    data: Object.values(data)
                }
            ]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: 'Statistics of last year'
            }
        }
    });
}

