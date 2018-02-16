const connectedUsers = {};

module.exports = (socket) => {
  console.log('a user connected');
  console.log('Socket id: ', socket.id);
  let user = '';
  // on login emit add user to add to connected users
  socket.on('add user', (string) => {
    user = string;
    connectedUsers[string] = socket;
    console.log(Object.keys(connectedUsers));
  });

  // on logout emit remove user to remove from connected users
  socket.on('remove user', (string) => {
    delete connectedUsers[string];
  });

  socket.on('new notification', (chefName) => {
    console.log(chefName);
    if (connectedUsers[chefName]) {
      socket.broadcast.to(connectedUsers[chefName].id).emit('notification alert');
    }
  });

  socket.on('send', (obj) => {
    console.log('Send object: ', obj);
    if (connectedUsers[obj.reciever]) {
      console.log('BROADCAST');
      socket.broadcast.to(connectedUsers[obj.reciever].id).emit('private message', obj);
      console.log('Between broadcast and emit');
      socket.emit('self message', obj);
    } else {
      console.log('SELF MESSAGE');
      socket.emit('self message', obj);
      // database insert call here
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete connectedUsers[user];
    user = '';
    console.log(connectedUsers);
  });
};
