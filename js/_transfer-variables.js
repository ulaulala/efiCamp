/*transfer-form inputs by id*/
const transferRecipient = document.querySelector('#recipient');
const transferRecipientSearch = document.querySelector('#recipient + img');
const transferNumber = document.querySelector('#number');
const transferSum = document.querySelector('#sum');
const transferWhen = document.querySelector('#when');
const transferTitle = document.querySelector('#title');

const transferCurrencySelect = document.querySelector('.custom-select #transfer-currency');
const addAccountButton = document.querySelector('.add-account-container');

/*inputs type=radio*/
const transferTypes = document.querySelectorAll('.transfer-type-container input');
const transferWheres = document.querySelectorAll('.transfer-where-container input');
const transferSpeeds = document.querySelectorAll('.transfer-speed-container input');

const transferSubmit = document.querySelector('#transfer-submit');

/*accounts*/
var currentAccount = document.querySelector('.current-account');
var listOfAccounts = document.querySelectorAll('.list-of-accounts-element');

// /*list of inputs to validate*/
// const listOfInputs = [transferRecipient, transferNumber, transferSum, transferWhen, transferTitle];

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

var recipientsList = [
    "Bradley Barton",
    "Zachary Wyatt",
    "Yasmin Miller",
    "Noah Lloyd",
    "Hannah Baldwin",
    "Amelie Sullivan",
    "Ewan Jones",
    "Zoe Pickering",
    "Lucas Miles",
    "Callum Nelson",
    "Elizabeth Holland",
    "Poppy Birch",
    "Thomas Jones"
];

const addingAccountModal = document.querySelector('#adding-account-modal');
const addingAccountContainer = document.querySelector('.new-account-container');

const newAccountCode = addingAccountContainer.querySelector('#new-account-code');
const newAccountCurrency = addingAccountContainer.querySelectorAll('#new-account-currency option');
const newAccountSaldo = addingAccountContainer.querySelector('#new-account-saldo');

const addButton = addingAccountContainer.querySelector('.dashboard-button');