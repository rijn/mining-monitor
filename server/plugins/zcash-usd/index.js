const rp = require('request-promise');

module.exports = ({ bus }) => {
  var apiCall = () => {
    return rp({
        uri: 'https://api.kraken.com/0/public/Spread?pair=ZECUSD',
        json: true
    })
    .then(response => {
        let ZECUSD = response.result.XZECZUSD[response.result.XZECZUSD.length - 1][1];
        let time = (new Date()).toISOString();
        bus.push({ module: 'zcash-usd', message: { ZECUSD, time } });
    })
    .catch(err => {
        console.error(err);
        res.status(500).end();
    });
  };

  setInterval(apiCall, 5000);
};
