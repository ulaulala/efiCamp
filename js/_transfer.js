transferRecipient.addEventListener('keyup', function(event) {
    filterText(this.value);
});
transferRecipientSearch.addEventListener('click', function(event) {
   searchRecipients();
});
transferCurrencySelect.addEventListener('click', function(event) {
    let valueAfterConversion = checkSum(transferSum);
    if(valueAfterConversion) {
        transferData.sum = valueAfterConversion;
    }
});
addAccountButton.addEventListener('click', function(event) {
   addAccount();
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
