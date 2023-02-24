const apiUrl = 'http://localhost:8081/api/auth';
const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = {};

    for(let element of loginForm.elements) {
        if(element.name.length > 0) {
            formData[element.name] = element.value;
        }
    }

    fetch(`${apiUrl}/login`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(({message, token}) => {
        if(message) {
            return console.error(message);
        }

        localStorage.setItem('token', token);
        document.location = 'chat.html';
    })
    .catch(err => console.error(err))
})

function handleCredentialResponse(response) {
           // decodeJwtResponse() is a custom function defined by you
           // to decode the credential response.
           const body = {id_token: response.credential }
           fetch(`${apiUrl}/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
           })
            .then(resp => resp.json())
            .then(resp => {
                localStorage.setItem('email', resp.user.email)
                localStorage.setItem('token', resp.token)
                window.location = 'chat.html'
            })
            .catch(err => {
                console.error(err);
            })
        }

        const bLogout = document.querySelector('#google_sign_out');

        bLogout.onclick = () => {
            google.accounts.id.disableAutoSelect();

            google.accounts.id.revoke(localStorage.getItem('email'), done => {
                localStorage.clear()
                location.reload()
            })
        }