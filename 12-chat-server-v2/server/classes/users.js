/**
 * 
 * {
 *  id: '',
    name: '',
    room: ''
 * }
 */

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    let user = {
      id,
      name,
      room
    };

    this.users.push(user);

    return this.users;
  }

  getUser(id) {
    let user = this.users.filter(u => u.id === id)[0];

    return user;
  }

  getAllUsers() {
    return this.users;
  }

  getUsersByRoom(room) {
    let usersOnRoom = this.users.filter(u =>  u.room === room);
    return usersOnRoom;
  }

  removeUser(id) {

    let deletedUser = this.getUser(id);
    this.users = this.users.filter(u => u.id !== id);

    return deletedUser;
  }
}

module.exports = {
  Users,
};
