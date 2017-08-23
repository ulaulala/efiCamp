document.addEventListener("DOMContentLoaded", function(event) {
    var ctx = document.querySelector('canvas').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August"],
            datasets: [
                {
                    label: "",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45150", "#3e15cd", "#8e1ea2", "#3cb19f"],
                    data: [2478, 5267, 734, 784, 433, 2017, 3735, 1234]
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
});