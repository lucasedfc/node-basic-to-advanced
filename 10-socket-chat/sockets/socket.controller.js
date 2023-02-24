const { Socket } = require("socket.io");
const { checkJWT } = require("../helpers");
const { ChatMessage } = require("../models");

const chatMessages = new ChatMessage();

const socketController = async (socket = new Socket(), io) => {
    // console.log('client connected', socket.id);

    try {
        const token = socket.handshake.headers['x-token'];
        const user = await checkJWT(token);
        if(!user) {
            return socket.disconnect();
        }

        // add user connectes
        chatMessages.connectUser(user);
        io.emit('active_users', chatMessages.usersArr);
        socket.emit('receive_message', chatMessages.lastMessages);

        // Connect user to room

        socket.join(user.id); // globa, socket id, user id

        // handle disconnect

        socket.on('disconnect', () => {
            chatMessages.disconnectUser(user.id);
            io.emit('active_users', chatMessages.usersArr);
        })

        socket.on('receive_message', ({uid, message}) => {

            // private message
            if(uid) {
                socket.to(uid).emit('private_message', {from: user.name, message});
            } else {
                // public message
                chatMessages.sendMessage(user.id, user.name, message);
                io.emit('receive_message', chatMessages.lastMessages);
            }
        })

        
    } catch (error) {
        console.log('Socket unauthorized');
        
    }
}

module.exports = {socketController};