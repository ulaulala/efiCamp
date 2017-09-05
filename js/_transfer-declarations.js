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

function searchRecipients() {
    const modal = document.querySelector('#searching-modal');
    const recipientsContainer = document.querySelector('.modal ul');

    modal.addEventListener('click', function(event) {
        if(!recipientsContainer.contains(event.target)) {
            modal.classList.add('hidden');
            modal.classList.remove('visible');
        }
    });

    modal.classList.remove('hidden');
    modal.classList.add('visible');

    if(recipientsContainer.children.length === 0) {
        for(let i = 0; i < recipientsList.length; i++) {
            var recipientListElement = document.createElement('li');
            recipientListElement.innerText = recipientsList[i];
            recipientsContainer.appendChild(recipientListElement);

            recipientListElement.addEventListener('click', function(event) {
                transferRecipient.value = this.innerText;

                modal.classList.add('hidden');
                modal.classList.remove('visible');
            });
        }
    }
}

function clearChildNodes(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}

function filterText(inputText) {
    const searchingListContainer = document.querySelector('.searching-list');

    clearChildNodes(searchingListContainer);

    if(inputText) {
        for(let i = 0; i < recipientsList.length; i++) {
            inputText = inputText.toLowerCase();
            let splitString = recipientsList[i].toLowerCase();
            splitString = splitString.split(' ');

            for(let j = 0; j < splitString.length; j++) {
                if(splitString[j].startsWith(inputText)) {
                    var recipientListElement = document.createElement('li');
                    recipientListElement.innerText = recipientsList[i];
                    searchingListContainer.appendChild(recipientListElement);

                    recipientListElement.addEventListener('click', function(event) {
                        transferRecipient.value = this.innerText;

                        clearChildNodes(searchingListContainer);
                    });

                    break;
                }
            }
        }
    }
}

function getAccountTemplate(accountCode, accountCurrency, accountSaldo) {
    return `<div>
                                    <div class="icon-center">
                                        <img src="img/transfer/current-account.svg">
                                    </div>
                                    <div>
                                        <p class="account-title">Savings account</p>
                                        <p class="account-code">` + accountCode + `</p>
                                    </div>
                                </div>
                                <p class="amount">
                                    <b>` + accountSaldo + ` </b><span class="currency">` + accountCurrency + `</span>
                                    <span class="down">
                                        <i class="material-icons">expand_more</i>
                                    </span>
                                </p>`;
}

function checkAccountCode(input) {
    input.value = input.value.replace(' ', '');
    if(!input.value) {
        input.classList.add('error-input');
        if(input.parentNode.querySelector('.speech-bubble')) {
            removeSpeechBubble(input);
        }
        showSpeechBubble(input, 'This field cannot be blank.');
        return false;
    }
    else if(input.value.length !== 26) {
        input.classList.add('error-input');
        if(input.parentNode.querySelector('.speech-bubble')) {
            removeSpeechBubble(input);
        }
        showSpeechBubble(input, 'Type 26 figures.');
        return false;
    }
    else {
        const accountCodes = document.querySelectorAll('.list-of-accounts-element .account-code');
        for(let i = 0; i < accountCodes.length; i++) {
            if(accountCodes[i].innerText.split(' ').join('') === input.value) {
                input.classList.add('error-input');
                if(input.parentNode.querySelector('.speech-bubble')) {
                    removeSpeechBubble(input);
                }
                showSpeechBubble(input, 'This account code already exist.');
                return false;
            }
        }
        if(input.classList.contains('error-input')) {
            input.classList.remove('error-input');
        }
        if(input.parentNode.querySelector('.speech-bubble')) {
            removeSpeechBubble(input);
        }
        return true;
    }
}

function addSpacesToAccountCode(code) {
    let codeArray = [
        code.substring(0,2),
        code.substring(2,6),
        code.substring(6,10),
        code.substring(10,14),
        code.substring(14,18),
        code.substring(18,22),
        code.substring(22,26)
    ];
    return codeArray.join(' ');
}

function checkSaldo(input) {
    if(!input.value) {
        input.classList.add('error-input');
        if(input.parentNode.querySelector('.speech-bubble')) {
            removeSpeechBubble(input);
        }
        showSpeechBubble(input, 'This field cannot be blank.');
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

function addAccount() {
    addingAccountModal.addEventListener('click', function(event) {
        if(!addingAccountContainer.contains(event.target)) { //close modal if click out of the container
            addingAccountModal.classList.add('hidden');
            addingAccountModal.classList.remove('visible');
        }
    });

    addingAccountModal.classList.add('visible');
    addingAccountModal.classList.remove('hidden');

    newAccountCode.addEventListener('focusout', function(event) {
        if (this.parentNode.querySelector('.speech-bubble')) {
            removeSpeechBubble(this);
        }
    });
    newAccountSaldo.addEventListener('focusout', function(event) {
        if (this.parentNode.querySelector('.speech-bubble')) {
            removeSpeechBubble(this);
        }
    });
    newAccountCode.addEventListener('keyup', function(event) {
        checkAccountCode(this);
    });
    newAccountSaldo.addEventListener('keyup', function(event) {
        checkSaldo(this);
    });

    addButton.addEventListener('click', function(event) {
        event.preventDefault();

        var newAccountCurrencyValue;
        for (let i = 0; i < newAccountCurrency.length; i++) {
            if(newAccountCurrency[i].selected) {
                newAccountCurrencyValue = newAccountCurrency[i].value.toUpperCase();
            }
        }

        if (checkAccountCode(newAccountCode) && checkSaldo(newAccountSaldo)) {
            const accountsContainer = document.querySelector('.list-of-accounts');
            var newAccountElement = document.createElement('div');
            newAccountElement.classList.add('list-of-accounts-element');
            newAccountElement.innerHTML = getAccountTemplate(addSpacesToAccountCode(newAccountCode.value), newAccountCurrencyValue, newAccountSaldo.value.replace('.',','));
            accountsContainer.appendChild(newAccountElement);

            currentAccount = document.querySelector('.current-account');
            listOfAccounts = document.querySelectorAll('.list-of-accounts-element');

            for (let i = 0; i < listOfAccounts.length; i++) { //new list of accounts
                listOfAccounts[i].classList.add('visible');

                listOfAccounts[i].addEventListener('click', function(event) {
                    changeAccount(this);
                });
            }

            addingAccountModal.classList.remove('visible');
            addingAccountModal.classList.add('hidden');
        }

    });
}