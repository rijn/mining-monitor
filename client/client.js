'use strict';
const io = require('socket.io-client');
var express = require("express");
var app = express();
var http = require('http');
var ip = require("ip");
var ping = require('ping');
var rp = require('request-promise');

var url = 'http://192.168.1.138:3150';
const socket = io(url);

setInterval(function(){

var host = 'us1-zcash.flypool.org';

Promise.all([
    rp({
        uri: 'http://localhost:42000/getstat',
        json: true
    }),
    ping.promise.probe(host)]
).then(values => {
    socket.emit('chat message',{
        'name': 'test',
        'ip': ip.address(),
        'server': values[0].current_server,
        'ping': values[1].time,
        'gpus': values[0].result.map(gpu => { return {
            name: gpu.name,
            temperature: gpu.temperature,
            watt: gpu.gpu_power_usage,
            speed: gpu.speed_sps
        };})
    })
});

}, 5000);
/*
http.get(options, function(res){
    var json = '';
    res.on('data', function (chunk) {
        json += chunk;
    });

    res.on('end', function(){
        if (res.statusCode === 200){
            try{
                var data = JSON.parse(json);
                socket.emit('upstream',{
                    'name': data.name,
                    'ip': ip.address(),
                    'server': data.current_server,

                })
                
            }
            catch(e){
                console.log('Error parsing JSON!');
            }
        }
        else{
            console.log('Status:', res.statusCode);
        }
    });
}).on('error', function(err){
    console.log('Error:', err);
});

function sendJson(data){
    
}
*/








