const input = document.querySelectorAll("input")[0];
const button = document.querySelectorAll("input")[1];
const eyeButton = document.querySelectorAll("button")[2];
const info = document.querySelector("form .error");

(function() {
    input.addEventListener("keyup", function(event) {
        input.classList.remove("failed");
        info.classList.remove("visible");
        info.classList.add("hidden");
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

function checkPassword() {
    if(input.value) {
        checkResponse();
    }
    else {
        input.classList.add("failed");
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
            info.classList.add("visible");
            info.classList.remove("hidden");
            info.innerText = response.responseJSON.message;
        },
        success: function(response) {
            console.log("succes", response);
            info.classList.remove("visible");
            info.classList.add("hidden");
        }
    });
}

function showPassword() {
    if (input.type === "password") {
        input.type = "text";
        eyeButton.classList.add("disable");
        eyeButton.classList.remove("enable");
    }
    else {
        input.type = "password";
        eyeButton.classList.add("enable");
        eyeButton.classList.remove("disable");
    }
}


