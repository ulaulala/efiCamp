/*transfer-form inputs by id*/
const transferRecipient = document.querySelector('#recipient');
const transferNumber = document.querySelector('#number');
const transferSum = document.querySelector('#sum');
const transferWhen = document.querySelector('#when');
const transferTitle = document.querySelector('#title');

const transferCurrencySelect = document.querySelector('.custom-select select');

/*inputs type=radio*/
const transferTypes = document.querySelectorAll('.transfer-type-container input');
const transferWheres = document.querySelectorAll('.transfer-where-container input');
const transferSpeeds = document.querySelectorAll('.transfer-speed-container input');

const transferSubmit = document.querySelector('#transfer-submit');

/*accounts*/
var currentAccount = document.querySelector('.current-account');
var listOfAccounts = document.querySelectorAll('.list-of-accounts-element');

/*list of inputs to validate*/
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