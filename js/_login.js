// Poniższe zmienne są aktualnie globalne, warto jest zawrzeć w zakresie (scopie)
// (function() { ... }) tak jak resztę kodu.

const input = document.querySelectorAll("input")[0];
const button = document.querySelectorAll("input")[1];
const eyeButton = document.querySelectorAll("button")[2];

(function() {
    input.addEventListener("keyup", function(event) {
        input.style.border = "none";
        info.style.visibility = "hidden";
    });
    button.addEventListener("click", function(event){
        event.preventDefault();
        checkPassword();
    });
    input.addEventListener("keypress", function(event){
        if (event.keyCode === 13) { /* 13 == enter */
            event.preventDefault();
            checkPassword();
        }
    });
    eyeButton.addEventListener("click", function(event) {
       event.preventDefault();
       showPassword();
    });
})();

var info = document.querySelector("form .error");

function checkPassword() {
            if(input.value) {
                checkResponse();
            }
            else {
                // Może zamiast inline-owych styli klasy? Dotyczy się też pozostałych przypadków.
                input.style.border = "solid 2px red";
            }
}

function checkResponse() {
    $.ajax({
        type: "post",
        data: {
            login: "efi",
            password: input.value
        },
        url: "https://efigence-camp.herokuapp.com/api/login",
        error: function(response) {
            console.log(response);


            info.style.visibility = "visible";
            info.innerText = response.responseJSON.message;
        },
        success: function(response) {
            console.log("succes", response);
            input.style.border = "solid 2px lightgreen";
            info.style.visibility = "hidden";
        }
    });
}

function showPassword() {
    if (input.type === 'password') {
        input.type = 'text';
        eyeButton.style.opacity = '0.4';
    }
    else {
        input.type = 'password';
        eyeButton.style.opacity = '1';
    }

}
