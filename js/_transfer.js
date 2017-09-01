/*transfer-form inputs by id*/
const transferRecipient = document.querySelector('#recipient');
const transferNumber = document.querySelector('#number');
const transferSum = document.querySelector('#sum');
const transferWhen = document.querySelector('#when');
const transferTitle = document.querySelector('#title');
const transferCurrencySelect = document.querySelector('.custom-select select');

const transferTypes = document.querySelectorAll('.transfer-type-container input');
const transferWheres = document.querySelectorAll('.transfer-where-container input');
const transferSpeeds = document.querySelectorAll('.transfer-speed-container input');

const transferSubmit = document.querySelector('#transfer-submit');

var currentAccount = document.querySelector('.current-account');
const expandMoreButton = document.querySelector('.current-account i');
var listOfAccounts = document.querySelectorAll('.list-of-accounts-element');

const listOfInputs = [transferRecipient, transferNumber, transferSum, transferWhen, transferTitle];

var transferData = { /*transfer summary*/
   accountCode: undefined,
   balanceAfterTransfer: undefined,
   type: undefined,
   recipient: undefined,
   where: undefined,
   number: undefined,
   sum: undefined,
   when: undefined,
   title: undefined,
   speed: undefined
};

transferRecipient.addEventListener('keyup', function(event) {
    if(checkTextField(this)){
        transferData.recipient = this.value;
    }
});
transferTitle.addEventListener('keyup', function(event) {
    if(checkTextField(this)) {
        transferData.title = this.value;
    }
});
transferNumber.addEventListener('keyup', function(event) {
    if(checkPhoneNumber(this)) {
        transferData.number = this.value;
    }
});
transferSum.addEventListener('keyup', function(event){
    let valueAfterConversion = checkSum(this);
    if(valueAfterConversion) {
        transferData.sum = valueAfterConversion;
    }
});
transferWhen.addEventListener('click', function(event){
    checkDate(this);
});
transferWhen.addEventListener('focusout', function(event){
    if(checkDate(this)) {
        transferData.when = this.value;
    }
});
transferCurrencySelect.addEventListener('click', function(event) {
    let valueAfterConversion = checkSum(transferSum);
    if(valueAfterConversion) {
        transferData.sum = valueAfterConversion;
    }
});
transferSubmit.addEventListener('click', function(event){
    event.preventDefault();
    generalValidation();
});
currentAccount.addEventListener('click', function(event) {
    for (let i = 0; i < listOfAccounts.length; i++) {
        if(listOfAccounts[i].style.display === 'flex') {
            listOfAccounts[i].style.display = 'none';
            this.querySelector('i').innerText = 'expand_more';
        }
        else {
            listOfAccounts[i].style.display = 'flex';
            this.querySelector('i').innerText = 'expand_less';
        }

        listOfAccounts[i].addEventListener('click', function(event) {
            changeAccount(this);
        });
    }
});


for (let i = 0; i < listOfInputs.length; i++) { /*speech bubble is hidden when user focus out*/
    listOfInputs[i].addEventListener('focusout', function(event) {
        if (this.parentNode.querySelector('.speech-bubble')) {
            removeSpeechBubble(this);
        }
    });
}

function checkDate(input) {
    let today = new Date().getTime();
    let whenDate = new Date(input.value);

    if(!input.value) {
        input.classList.add('error-input');
        showSpeechBubble(input, 'This field cannot be blank.');
        return false;
    }
    else if(whenDate < today) {
        input.classList.add('error-input');
        showSpeechBubble(input, 'Date must be in the future.');
        return false;
    }
    else {
        if(input.classList.contains('error-input')) {
            input.classList.remove('error-input');
        }
        if(input.parentNode.querySelector('.speech-bubble')) {
            removeSpeechBubble(input);
        }
        return true;
    }
}

function checkTextField(input) {
    if(!input.value) {
        input.classList.add('error-input');
        showSpeechBubble(input, 'This field cannot be blank.');
        return false;
    }
    else if(input.value.length > 256) {
        input.classList.add('error-input');
        showSpeechBubble(input, 'Maximum 256 characters.');
        return false;
    }
    else if(/^[a-zA-Z0-9- ]*$/.test(input.value) === false) {
        showSpeechBubble(input, 'This field contains illegal characters.');
        return false;
    }
    else {
        if(input.classList.contains('error-input')) {
            input.classList.remove('error-input');
        }
        if(input.parentNode.querySelector('.speech-bubble')) {
            removeSpeechBubble(input);
        }
        return true;
    }
}

function showSpeechBubble(input, textMessage) {
    if(input.parentNode.querySelector('.speech-bubble')) { /*only one speech bubble*/
        removeSpeechBubble(input);
    }

    let speechBubbleDiv = document.createElement('div');
    speechBubbleDiv.className += 'speech-bubble';
    speechBubbleDiv.innerHTML = textMessage;

    input.parentNode.appendChild(speechBubbleDiv);
}
function removeSpeechBubble(input) {
    let bubbleToRemove = input.parentNode.querySelector('.speech-bubble');
    input.parentNode.removeChild(bubbleToRemove);
}

function checkPhoneNumber(input) {
    if(!input.value) {
        input.classList.add('error-input');
        if(input.parentNode.querySelector('.speech-bubble')) {
            removeSpeechBubble(input);
        }
        showSpeechBubble(input, 'This field cannot be blank.');
        return false;
    }
    else if(input.value < 1000000 || input.value > 999999999 || isNaN(input.value)) {
        input.classList.add('error-input');
        if(input.parentNode.querySelector('.speech-bubble')) {
            removeSpeechBubble(input);
        }
        showSpeechBubble(input, 'Invalid phone number.');
        return false;
    }
    else {
        if(input.classList.contains('error-input')) {
            input.classList.remove('error-input');
        }
        if(input.parentNode.querySelector('.speech-bubble')) {
            removeSpeechBubble(input);
        }
        return true;
    }
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function checkSum(input) {
    if(!input.value) {
        input.classList.add('error-input');
        showSpeechBubble(input, 'This field cannot be blank.');
        return false;
    }
    else {
        if(isNumeric(input.value)) {
            var saldo = document.querySelector('.amount b').innerText.replace(',', '.');
            saldo = Number(saldo);

            var sum = input.value;

            let options = input.parentNode.querySelectorAll('.custom-select option');
            let currencyOfAccount = document.querySelector('#amountCurrency').innerText;
            for (let i = 0; i < options.length; i++) {
                if(options[i].selected) {
                    sum = convert(input.value, options[i].value, currencyOfAccount);
                }
            }
            document.querySelector('#sumAfterConvert').innerText = sum + ' ' + currencyOfAccount;
        }
        if (saldo === 0 || sum > saldo || sum <= 0 || isNaN(input.value)) {
            input.classList.add('error-input');
            showSpeechBubble(input, 'Invalid value.');
            return false;
        }
        else {
            if (input.classList.contains('error-input')) {
                input.classList.remove('error-input');
            }
            if (input.parentNode.querySelector('.speech-bubble')) {
                removeSpeechBubble(input);
            }
            return sum;
        }
    }
}

function convert(value, currencyFrom, currencyTo) {
    currencyFrom = currencyFrom.toLowerCase();
    currencyTo = currencyTo.toLowerCase();

    if(currencyTo === 'pln') {
        switch(currencyFrom) {
            case 'eur':
                value *= 4.25;
                break;
            case 'usd':
                value *= 3.59;
                break;
            case 'gpb':
                value *= 4.62;
                break;
        }
    }
    else if(currencyTo === 'eur') {
        switch(currencyFrom) {
            case 'pln':
                value *= 0.23;
                break;
            case 'usd':
                value *= 0.84;
                break;
            case 'gpb':
                value *= 1.08;
                break;
        }
    }
    else if(currencyTo === 'usd') {
        switch(currencyFrom) {
            case 'eur':
                value *= 1.18;
                break;
            case 'pln':
                value *= 0.27;
                break;
            case 'gpb':
                value *= 1.28;
                break;
        }
    }
    else if(currencyTo === 'gpb') {
        switch(currencyFrom) {
            case 'eur':
                value *= 0.92;
                break;
            case 'usd':
                value *= 0.77;
                break;
            case 'pln':
                value *= 0.21;
                break;
        }
    }
    return value;
}

function isCorrect() {
    return  checkTextField(transferRecipient) &&
            checkPhoneNumber(transferNumber) &&
            checkSum(transferSum) &&
            checkDate(transferWhen) &&
            checkTextField(transferTitle);
}

function generalValidation() {
    saveCheckboxesData(); /*checkboxes are checked by default*/
    getAccountData(); /*account code with new balance*/
    isCorrect()? window.location = 'dashboard.html' : console.log('HTTP 418: more info -> http://www.google.pl/teapot');
}

function getAccountData() {
    transferData.accountCode = currentAccount.querySelector('.account-code').innerText;
    transferData.balanceAfterTransfer = Number(currentAccount.querySelector('b').innerText.replace(',', '.')) - transferData.sum;
}

function saveCheckboxesData() {
    transferData.type = findChecked(transferTypes);
    transferData.where = findChecked(transferWheres);
    transferData.speed = findChecked(transferSpeeds);
}

function findChecked(inputsGroup) {
    for(let i = 0; i < inputsGroup.length; i++) {
        if(inputsGroup[i].checked) {
            return inputsGroup[i].value;
        }
    }
}

function changeAccount(accountElement) {
    currentAccount = document.querySelector('.current-account');
    listOfAccounts = document.querySelectorAll('.list-of-accounts-element');

    let currentAccountCode = currentAccount.querySelector('.account-code');
    let currentAccountBalance = currentAccount.querySelector('b');
    let currentAccountCurrency = currentAccount.querySelector('.currency');

    let accountCode = accountElement.querySelector('.account-code');
    let accountBalance = accountElement.querySelector('b');
    let accountCurrency = accountElement.querySelector('.currency');

    replaceContent(currentAccountCode, accountCode);
    replaceContent(currentAccountBalance, accountBalance);
    replaceContent(currentAccountCurrency, accountCurrency);

    checkSum(transferSum);
}

function replaceContent(containerFrom, containerTo) {
    let temp = containerFrom.innerText;
    containerFrom.innerText = containerTo.innerText;
    containerTo.innerText = temp;
}