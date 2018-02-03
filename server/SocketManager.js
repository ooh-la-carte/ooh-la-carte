const connectedUsers = {};

module.exports = (socket) => {
  console.log('a user connected');
  console.log('Socket id: ', socket.id);

  // on login emit add user to add to connected users
  socket.on('add user', (string) => {
    console.log('Add: ', string);
    connectedUsers[string] = socket;
    console.log(Object.keys(connectedUsers));
  });

  // on logout emit remove user to remove from connected users
  socket.on('remove user', (string) => {
    console.log('Remove: ', string);
    delete connectedUsers[string];
  });

  socket.on('send', (obj) => {
    console.log('Message recieved!', obj);
    socket.emit('new message', obj);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    console.log(connectedUsers);
  });
};
