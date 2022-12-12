
const divVotosSi = document.querySelector('#votosSi');
const divVotosNo = document.querySelector('#votosNo');
const divVotosNulo = document.querySelector('#votosNulo');

const urlResultados = ( window.location.hostname.includes('localhost') )
                    ? 'http://localhost:8080/api/usuarios/'
                    : '';




const contarVotosTotales = () => {
 

    console.log('Evento se realizó')
    fetch( urlResultados, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then( resp => resp.json() )
    .then( ({ votosSi, votosNo, votosNulo  }) => {

        divVotosSi.innerText = ` Votos Si: ${votosSi}`;
        divVotosNo.innerText = ` Votos No: ${votosNo}`;
        divVotosNulo.innerText = ` Votos Nulo: ${votosNulo}`;
        

    } )
    .catch( err => {
        console.log( err )
    } )
                    
}


contarVotosTotales();