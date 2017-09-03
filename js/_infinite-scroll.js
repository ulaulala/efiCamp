const howManyForOnce = 10;
var startIndex = howManyForOnce;
var letScrollMore = true;

$(document).ready(function() {
    var win = $(window);

    $.ajax({
        type: "get",
        dataType: "json",
        url: "https://efigence-camp.herokuapp.com/api/data/history",
        error: function(response) {
            console.log(response);
        },
        success: function(response) {
            var historyContainer = document.querySelector('ul.history-container');
            for(let i = 0; i < howManyForOnce ; i++) {
                var historyElement = document.createElement('li');
                historyElement.innerHTML = getHistoryTemplate(response.content[i]);
                historyContainer.appendChild(historyElement);
            }
        }
    });

    const loading = document.querySelector('#loading');

    win.scroll(function() {

        //round to be sure pixels will be the same
        if (((Math.round(($(document).height() - win.height())/2)) === Math.round(win.scrollTop()/2))) {

            if(letScrollMore) {
                loading.classList.add('visible');
                loading.classList.remove('hidden');

                setTimeout(function(){ //wait a second to show loading info
                    $.ajax({
                        type: "get",
                        dataType: "json",
                        url: "https://efigence-camp.herokuapp.com/api/data/history",
                        error: function(response) {
                            console.log(response);
                        },
                        success: function(response) {
                            var endIndex = startIndex + howManyForOnce;

                            if (endIndex > response.content.length) {
                                endIndex = response.content.length;
                                letScrollMore = false;
                            }
                            var historyContainer = document.querySelector('ul.history-container');
                            for(let j = startIndex; j < endIndex; j++) {
                                var historyElement = document.createElement('li');
                                historyElement.innerHTML = getHistoryTemplate(response.content[j]);
                                historyContainer.appendChild(historyElement);
                            }
                            loading.classList.remove('visible');
                            loading.classList.add('hidden');

                            startIndex = endIndex;
                        }
                    });
                }, 1000);
            }
        }
    });
});
