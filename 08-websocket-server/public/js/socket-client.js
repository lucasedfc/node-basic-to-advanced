//HTML Red

const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => {
    console.log('connected');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
})

socket.on('disconnect', () => {
    console.log('disconnected from socket server');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
})

socket.on('send_message', (payload) => {
    console.log(payload);
})

btnSend.addEventListener('click', () => {
    const message = txtMessage.value;
    const payload = {
        message,
        id: '123ABC',
        date: new Date().getTime()
    }
    socket.emit('send_message', payload, (id) => {
        console.log('id from server', id);
    });
})