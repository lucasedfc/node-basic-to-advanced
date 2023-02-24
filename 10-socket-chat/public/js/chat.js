
//HTML Ref
const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const usersUl = document.querySelector('#usersUl');
const messagesUl = document.querySelector('#messagesUl');
const logoutBtn = document.querySelector('#logoutBtn');

const apiUrl = 'http://localhost:8081/api/auth';
let user = null;
let socket = null;

const validateToken = async() => {

    try {
        
        const token = localStorage.getItem('token') || '';
    
        if (token.length <= 10) {
            window.location = 'index.html';
            throw new Error('Invalid Token');
        }
        
        const resp = await fetch(apiUrl, {
            headers: {
                'x-token': token
            }
        });
        
        const { user: userDB, token: tokenDB } = await resp.json();
        localStorage.setItem('token', tokenDB);
        user = userDB;
        document.title = user.name;
        
        
        await connectSocket();
    } catch (error) {
        window.location = 'index.html';        
    }
}

const connectSocket = async() => {
    
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });
    
    socket.on('connect', () => {
        console.log('Socket Online');
    })
    
    socket.on('diconnect', () => {
        console.log('Socket Offline');
        // localStorage.clear();
        // window.location = 'index.html';        
    })

    socket.on('receive_message', (payload) => {
        //TODO: handle messsages
        showMessages(payload);
    })

    socket.on('active_users', (payload) => {
        //TODO: handle users
        showUsers(payload);
    })

    socket.on('private_message', (payload) => {
        //TODO: handle private message
        console.log('private', payload);
    })

}


const showUsers = (users = []) => {
    let usersHtml = '';
    users.forEach(({name, uid}) => {
        usersHtml += `
        <li>
            <p>
                <h5 class="text-success">${name}</h5>
                <span class="fs-6 text-muted">${uid}</span>
            </p>
        </li>
        `
    })

    usersUl.innerHTML = usersHtml;
}

const showMessages = (messages = []) => {
    let messagesHtml = '';
    messages.forEach(({message, name}) => {
        messagesHtml += `
        <li>
            <p>
                <span class="text-primary">${name}</span>
                <span>${message}</span>
            </p>
        </li>
        `
    })

    messagesUl.innerHTML = messagesHtml;
}

txtMessage.addEventListener('keyup', ({keyCode}) => {
    const message = txtMessage.value;
    const uid = txtUid.value;
    if(keyCode !== 13) { return;}
    if(message.length === 0) { return;}

    socket.emit('receive_message', {message, uid});

    txtMessage.value = '';


})

const main =  async() => {

    await validateToken();

}

main();
