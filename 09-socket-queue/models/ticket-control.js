const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}

class TicketControl {
    

    constructor(params) {
        this.last = 0;
        this.today = new Date().getDay();
        this.tickets = [];
        this.lastFourTickets = [];

        this.init();
        
    }

    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFourTickets: this.lastFourTickets,
        }
    }

    init() {
        const {today, tickets, lastFourTickets, last} = require('../db/data.json');
        if (this.today === today) {
            this.tickets = tickets;
            this.last = last;
            this.lastFourTickets = lastFourTickets;
        } else {
            this.saveDB();
        }
        
    }

    saveDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    next() {
        this.last += 1;
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveDB();

        return `Ticket ${ticket.number}`;
    }

    takeTicket(desk) {


        if (this.tickets.length === 0) {
            return null;
        }

        const ticket = this.tickets.shift(); // this.tickets[0];
        ticket.desk = desk;

        this.lastFourTickets.unshift(ticket);

        if (this.lastFourTickets.length > 4) {
            this.lastFourTickets.splice(-1, 1);
        }
        
        this.saveDB();

        return ticket;
    }
}

module.exports = TicketControl;