
const TicketControl = require('../models/ticket-control');
const ticketControl = new TicketControl();


const socketController = (socket) => {
    // When client is connected
    socket.emit('last_ticket', ticketControl.last);
    socket.emit('actual_state', ticketControl.lastFourTickets);
    socket.emit('pending_tickets', ticketControl.tickets.length);

    socket.on('new_ticket', ( payload, callback ) => {
        
        const next = ticketControl.next();
        callback(next);

        //TODO: 
        socket.broadcast.emit('pending_tickets', ticketControl.tickets.length);
    })

    socket.on('take_ticket', ( { desk }, callback ) => {
        
        if (!desk) {
            return callback({
                ok: false,
                message: 'Desk is required'
            });
        }

        const ticket = ticketControl.takeTicket(desk);
        socket.broadcast.emit('actual_state', ticketControl.lastFourTickets);
        socket.broadcast.emit('pending_tickets', ticketControl.tickets.length);
        socket.emit('pending_tickets', ticketControl.tickets.length);

        if(!ticket) {
            callback({
                ok: false,
                message: 'There is no more tickets'
            });
            return
        } else {
            callback({
                ok: true,
                ticket
            });
        }
    })

}



module.exports = {
    socketController
}

