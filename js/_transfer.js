transferRecipient.addEventListener('keyup', function(event) {
    filterText(this.value);
    if(checkTextField(this)){
        transferData.recipient = this.value;
    }
});
transferRecipientSearch.addEventListener('click', function(event) {
   searchRecipients();
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
        if(listOfAccounts[i].classList.contains('visible')) {
            listOfAccounts[i].classList.add('hidden');
            if(listOfAccounts[i].classList.contains('visible')){
                listOfAccounts[i].classList.remove('visible');
            }
            this.querySelector('i').innerText = 'expand_more';
        }
        else {
            if(listOfAccounts[i].classList.contains('hidden')) {
                listOfAccounts[i].classList.remove('hidden');
            }
            listOfAccounts[i].classList.add('visible');
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


