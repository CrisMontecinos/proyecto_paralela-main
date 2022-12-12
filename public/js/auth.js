


const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : '';



function handleCredentialResponse(response) {

    const body = { id_token: response.credential }
    fetch(url + 'google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then( r => r.json() )
    .then( ({ msg, token }) => {

        if(token){
            console.log( token );
            localStorage.setItem('token', token );
            window.location = 'votar.html';
        }else{
            window.alert(msg);
        }
        
    })
    .catch( console.warn )
}


const button = document.getElementById('g_id_signout');
button.onclick = async() => {

    console.log(google.accounts.id)
    google.accounts.id.disableAutoSelect()
    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        console.log('consent revoked');
        localStorage.clear()
        location.reload()
    });
}
