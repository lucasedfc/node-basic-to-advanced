const socketController = (socket) => {
  console.log('client connected', socket.id);

  socket.on('disconnect', () => {
    console.log('client disconnected', socket.id);
  });

  socket.on('send_message', (payload, callback) => {
    const id = 123456;
    callback(id);

    // emit to all clients
    socket.broadcast.emit('send_message', payload);
  });
};

module.exports = {
  socketController,
};
