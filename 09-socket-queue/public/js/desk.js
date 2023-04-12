// Referencias del HTML
const deskLabel  = document.querySelector('#deskLabel');
const ticketsQueue  = document.querySelector('#ticketsQueue');
const ticketLabel  = document.querySelector('small');
const alertDiv  = document.querySelector('.alert');
const takeTicketBtn  = document.querySelector('#takeTicketBtn');
const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('desk')) {
    window.location = 'index.html'
    throw new Error('Desk is required');
    
}

const desk = searchParams.get('desk');
deskLabel.innerText = desk;

alertDiv.style.display = 'none';


const socket = io();



socket.on('connect', () => {
    takeTicketBtn.disabled = false; 
});

socket.on('disconnect', () => {
    takeTicketBtn.disabled = true;
});

socket.on('pending_tickets', (pendingTickets) => {
    if (pendingTickets === 0) {
        ticketsQueue.style.display = 'none';
    } else {
        ticketsQueue.style.display = '';
        ticketsQueue.innerText = pendingTickets;
    }
})

takeTicketBtn.addEventListener( 'click', () => {

    
    socket.emit('take_ticket', { desk }, ({ok, ticket, message}) => {
        if (!ok) {
            ticketLabel.innerText = `Nobody`;
            return alertDiv.style.display = '';
        }

        ticketLabel.innerText = `Ticket ${ticket.number}`;
    });
    
    // socket.emit( 'new_ticket', null, ( ticket ) => {
    //     lblNewTicket.innerText = ticket;
    // });

});