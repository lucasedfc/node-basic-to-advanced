const urlParams = new URLSearchParams(window.location.search);

const userDivHtml = $('#divUsers');
const sendFormHtml = $('#sendForm');
const txtMessageHtml = $('#txtMessage');
const divChatbox = $('#divChatbox');

const name = urlParams.get('name');
const room = urlParams.get('room');
//? Render User Functions
const renderUsers = (users) => {
  // [{}, {}]
  let html = '';

  html += `<li>`;
  html += `    <a href="javascript:void(0)" class="active"> Chat Room <span>  ${urlParams.get(
    'room'
  )} </span></a>`;
  html += `</li>`;

  for (let i = 0; i < users.length; i++) {
    html += `<li>`;
    html += `    <a data-id="${users[i].id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${users[i].name} <small class="text-success">online</small></span></a>`;
    html += `</li>`;

}
userDivHtml.html(html);
};

const renderMessages = (data, self) => {

    let html = '';
    const date = new Date(data.date);
    const hour = date.getHours() + ':' + date.getMinutes();
    let adminClass = 'info';

    if (data.name === 'Administrator') {
        adminClass = 'danger';
    }

    if(self) {
        html += `<li class="reverse">`
        html +=     `<div class="chat-content">`
        html +=         `<h5>${data.name}</h5>`
        html +=         `<div class="box bg-light-inverse">${data.message}</div>`
        html +=     `</div>`
        html +=     `<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>`
        html +=     `<div class="chat-time">${hour}</div>`
        html += `</li>`
    } else {
        html += `<li class="animated fadeIn">`;
        if(data.name !== 'Administrator') {
            html += `    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>`;
        }
        html += `    <div class="chat-content">`;
        html += `        <h5>${data.name}</h5>`;
        html += `        <div class="box bg-light-${adminClass}">${data.message}</div>`;
        html += `    </div>`;
        html += `    <div class="chat-time">${hour}</div>`;
        html += `</li>`;
        
    }



    
    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


// listeners

userDivHtml.on('click', 'a', function() {

    const id = $(this).data('id');

    if (id) {
        console.log(id);
    }
})

sendFormHtml.on('submit', function(e) {
    e.preventDefault();
    if(txtMessageHtml.val().trim().length === 0) {
        return;
    }
    // Emit Data to all users
    socket.emit('createMessage', {
        name,
        message: txtMessageHtml.val()
    }, function(message) {
        txtMessageHtml.val('').focus();
        renderMessages(message, true);
        scrollBottom();
    });

})