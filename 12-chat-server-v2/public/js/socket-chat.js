const socket = io();

const params = new URLSearchParams(window.location.search);

if(!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('Name and room are required');
}

const user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function() {
    console.log('Connected to the server');

    socket.emit('loginChat', user, (resp) => {
        console.log('Users connected', resp);
    } )
});

// escuchar
socket.on('disconnect', function() {

    console.log('Server connection lost');

});


// Emit Data to all users
// socket.emit('createMessage', {
//     usuario: 'Luke',
//     mensaje: 'Hi there'
// }, function(resp) {
//     console.log('server response: ', resp);
// });

// Listen events
socket.on('createMessage', (message) => {

    console.log('Server:', message);

});

// connect or disconnect events, receive all users
socket.on('listOfUsers', (users) => {

    console.log('Server:', users);

});


// private message

socket.on('privateMessage', (message) => {
    console.log('private message', message);
})