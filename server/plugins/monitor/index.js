module.exports = ({ bus, socket = null, io }) => {
  if (!socket) return;

  socket.on('register', function () {
    console.log('register');
    socket.join('monitor');

    if (!io.pushService) {
      io.pushService = setInterval(function () {
        if (bus.empty()) return;
        console.log('downstream', bus.pull());
        io.to('monitor').emit('downstream', bus.pull());
        bus.flush();
      }, 2000);
    }
  });
};
