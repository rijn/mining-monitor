module.exports = ({ bus, socket = null }) => {
  if (!socket) return;

  socket.on('upstream', function (m) {
    m.time = (new Date()).toISOString();
    bus.push({ module: 'miner', message: m });
  });
};
