var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var bus = ((() => {
  var Bus = function () {
    this.queue = [];
  };

  Bus.prototype.push = function (m) {
    this.queue.push(m);
  };

  Bus.prototype.pull = function () {
    return this.queue;
  };

  Bus.prototype.flush = function () {
    this.queue = [];
  };

  Bus.prototype.empty = function () {
    return !this.queue.length
  };

  return new Bus();
})());

app.use('/', express.static(path.join(__dirname, 'dist')));

require('./plugins/zcash-usd')({ bus, io });
require('./plugins/pool')({ bus, io });

io.on('connection', function (socket) {
  require('./plugins/miner')({ bus, socket });
  require('./plugins/monitor')({ bus, socket, io });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
