const ticketLabel1 = document.querySelector('#ticketLabel1');
const deskLabel1 = document.querySelector('#deskLabel1');
const ticketLabel2 = document.querySelector('#ticketLabel2');
const deskLabel2 = document.querySelector('#deskLabel2');
const ticketLabel3 = document.querySelector('#ticketLabel3');
const deskLabel3 = document.querySelector('#deskLabel3');
const ticketLabel4 = document.querySelector('#ticketLabel4');
const deskLabel4 = document.querySelector('#deskLabel4');
const socket = io();

socket.on('actual_state', (lastFourTickets) => {


    // const audio = new Audio('../audio/new-ticket.mp3');
    // audio.play();
  const [ticket1, ticket2, ticket3, ticket4] = lastFourTickets;
  if (ticket1) {
    ticketLabel1.innerText = 'Ticket ' + ticket1.number;
    deskLabel1.innerText = ticket1.desk;
  } else {
    ticketLabel1.innerText  = '---------';
    deskLabel1.innerText    = '---------';
  }
  if (ticket2) {
    ticketLabel2.innerText = 'Ticket ' + ticket2.number;
    deskLabel2.innerText = ticket2.desk;
  } else {
    ticketLabel2.innerText  = '---------';
    deskLabel2.innerText    = '---------';
  }
  if (ticket3) {
    ticketLabel3.innerText = 'Ticket ' + ticket3.number;
    deskLabel3.innerText = ticket3.desk;
  } else {
    ticketLabel3.innerText  = '---------';
    deskLabel3.innerText    = '---------';
  }
  if (ticket4) {
    ticketLabel4.innerText = 'Ticket ' + ticket4.number;
    deskLabel4.innerText = ticket4.desk;
  } else {
    ticketLabel4.innerText  = '---------';
    deskLabel4.innerText    = '---------';
  }
});
