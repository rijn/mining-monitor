'use strict';

const _ = require('lodash');

const Promise = require("bluebird");

const rp = require('request-promise');

const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    Promise.all([
        rp({
            uri: 'http://localhost:42000/getstat',
            json: true
        }),
        rp({
            uri: 'http://zcash.flypool.org/api/miner_new/t1STYd26FqHnyay37yjf94qi9nxG3GFtfzL',
            json: true
        }),
        rp({
            uri: 'https://api.kraken.com/0/public/Spread?pair=ZECUSD',
            json: true
        })
    ])
        .then(results => {
            let earned = results[1].payouts.reduce((acc, item) => acc + item.amount, 0.0) * 1e-8;
            let unpaid = results[1].unpaid * 1e-8;
            let ZECUSD = results[2].result.XZECZUSD[results[2].result.XZECZUSD.length - 1][1];
            res
                .send([
                    `${results[0].result[0].name}: ${results[0].result[0].temperature}`,
                    `Earned: ` + earned,
                    `Unpaid: ` + unpaid,
                    `ZECUSD: ` + ZECUSD,
                    `USD: ` + (earned + unpaid) * Number(ZECUSD)
                ].join('<br/>'));
        })
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
});

app.listen(3001, () => { });