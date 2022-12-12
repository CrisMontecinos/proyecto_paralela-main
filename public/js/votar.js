

const botonsi = document.querySelector('#botonsi');
const botonno = document.querySelector('#botonno');
const botonnulo = document.querySelector('#botonnulo');



const urlAuth = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : '';


const urlVotar = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/usuarios/'
            : '';



const validarJWT = async() => {

    const token = localStorage.getItem('token') || '';
            
        if( token.length <= 10 ) {
    
            window.location = 'index.html';
            throw new Error('No hay token en el servidor');
        }
    
        const resp = await fetch( urlAuth, {
            headers: { 'x-token': token }
        });
    
        const { usuario, token: tokenDB } = await resp.json();
        localStorage.setItem( 'token', tokenDB );
        userDB = usuario;
        document.title = usuario.nombre;
        console.log('El token se verificó correctamente');
    
}        

validarJWT();


const presionarBotonSi = () => {
 

    console.log('Evento se realizó')
    fetch( urlVotar + userDB.uid, {
        method: 'POST',
        body: JSON.stringify({
            userDB,
            votoRealizado: 'Si'
        }),
        headers: { 'Content-Type': 'application/json' }
    } )
    .then( resp => resp.json() )
    .then( ({ msg  }) => {

        // localStorage.setItem( 'token', token )
        window.alert(msg);
        window.location = 'resultados.html';

    } )
    .catch( err => {
        console.log( err )
    } )

}

const presionarBotonNo = () => {
 

    console.log('Evento se realizó')
    fetch( urlVotar + userDB.uid, {
        method: 'POST',
        body: JSON.stringify({
            userDB,
            votoRealizado: 'No'

        }),
        headers: { 'Content-Type': 'application/json' }
    } )
    .then( resp => resp.json() )
    .then( ({ msg  }) => {

        // localStorage.setItem( 'token', token )
        window.alert(msg);
        window.location = 'resultados.html';

    } )
    .catch( err => {
        console.log( err )
    } )

}


const presionarBotonNulo = () => {
 

    console.log('Evento se realizó')
    fetch( urlVotar + userDB.uid, {
        method: 'POST',
        body: JSON.stringify({
            userDB,
            votoRealizado: 'Nulo'

        }),
        headers: { 'Content-Type': 'application/json' }
    } )
    .then( resp => resp.json() )
    .then( ({ msg  }) => {

        // localStorage.setItem( 'token', token )
        window.alert(msg);
        window.location = 'resultados.html';

    } )
    .catch( err => {
        console.log( err )
    } )

}

