'use strict';

const Promise = require("bluebird");

var fs = require("fs");
Promise.promisifyAll(fs);

const rp = require('request-promise');

const express = require('express');
const app = express();

var options = {
    uri: 'http://localhost:42000/getstat',
    json: true
};

app.get('/', (req, res) => {
    rq(options)
        .then(res => {
            res.send(res).end();
        })
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
});

app.listen(3001, () => { });