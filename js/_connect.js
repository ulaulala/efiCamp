const containers = {    /*selectors to place data*/
  balance: '#balance',
  funds: '#funds',
  payments: '#payments'
};

getSummary('data/summary', containers);

getProducts("data/products");

getHistory("data/history");