module.exports = ({ bus, socket = null }) => {
  if (!socket) return;

  socket.on('upstream', function (m) {
    bus.push({ module: 'miner', message: m });
  });
};
