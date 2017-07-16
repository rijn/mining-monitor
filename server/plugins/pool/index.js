const rp = require('request-promise');

module.exports = ({ bus }) => {
  var apiCall = () => {
    return rp({
        uri: 'http://zcash.flypool.org/api/miner_new/t1STYd26FqHnyay37yjf94qi9nxG3GFtfzL',
        json: true
    })
    .then(response => {
        let earned = (response.payouts.reduce((acc, item) => acc + item.amount, 0.0) * 1e-8).toFixed(6);
        let unpaid = (response.unpaid * 1e-8).toFixed(6);
        let time = (new Date()).toISOString();
        bus.push({ module: 'pool', message: { time, earned, unpaid } });
    })
    .catch(err => {
        console.error(err);
        res.status(500).end();
    });
  };

  setInterval(apiCall, 10000);
  apiCall();
};
