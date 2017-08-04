const input = document.querySelectorAll("input")[0];
const button = document.querySelectorAll("input")[1];
const eyeButton = document.querySelectorAll("button")[2];

(function() {
    button.addEventListener("click", function(event){
        event.preventDefault();
        checkPassword();
    });
    eyeButton.addEventListener("click", function(event) {
       event.preventDefault();
       showPassword();
    });
})();

function checkPassword() {
    var info = document.querySelector("form .error");

    if(!input.value) {
        input.style.border = "solid 2px red";
        info.style.visibility = "visible";
        setInterval(function() {
            if(input.value) {
                input.style.border = "solid 2px lightgreen";
                info.style.visibility = "hidden";
                button.addEventListener("click", function(event) {
                    window.open('index.html');
                });
            }
            else {
                input.style.border = "solid 2px red";
                info.style.visibility = "visible";
            }
        }, 500);
    }
    else {
        window.open('index.html');
    }
}

function showPassword() {
    input.type === 'password' ? input.type = 'text' : input.type = 'password';
}