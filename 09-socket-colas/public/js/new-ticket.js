// Referencias del HTML
const lblNewTicket  = document.querySelector('#lblNewTicket');
const newTicketBtn = document.querySelector('button');


const socket = io();



socket.on('connect', () => {
    newTicketBtn.disabled = false; 
});

socket.on('disconnect', () => {
    newTicketBtn.disabled = true;
});

socket.on('last_ticket', (ticket) => {
    lblNewTicket.innerText = `Ticket ${ticket}`;
})

newTicketBtn.addEventListener( 'click', () => {

    
    socket.emit( 'new_ticket', null, ( ticket ) => {
        lblNewTicket.innerText = ticket;
    });

});