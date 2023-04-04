const { io } = require('../server');

const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {
  client.on('loginChat', (data, callback) => {
    if (!data.name || !data.room) {
      return callback({
        error: true,
        message: 'Name and Room are required',
      });
    }

    // add user to specific room
    client.join(data.room);

    users.addUser(client.id, data.name, data.room);

    client.broadcast
    .to(data.room)
    .emit(
      'createMessage',
      createMessage('Administrator', `${data.name} join the room`)
    );

    client.broadcast
      .to(data.room)
      .emit('listOfUsers', users.getUsersByRoom(data.room));


    callback(users.getUsersByRoom(data.room));
  });

  client.on('disconnect', () => {
    let userDeleted = users.removeUser(client.id);


    client.broadcast
      .to(userDeleted.room)
      .emit(
        'createMessage',
        createMessage('Administrator', `${userDeleted.name} left the room`)
      );

    client.broadcast
      .to(userDeleted.room)
      .emit('listOfUsers', users.getUsersByRoom(userDeleted.room));
  });

  client.on('createMessage', (data, callback) => {

    let user = users.getUser(client.id);
    let message = createMessage(user.name, data.message);

    client.broadcast.to(user.room).emit('createMessage', message);

    callback(message);
  });

  //! private message
  client.on('privateMessage', (data) => {
    let user = users.getUser(client.id);
    client.broadcast
      .to(data.to)
      .emit('privateMessage', createMessage(user.name, data.message));
  });
});
