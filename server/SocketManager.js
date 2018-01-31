module.exports = (socket) => {
  console.log('a user connected');
  console.log('Socket id: ', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
};
