const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');



const usuariosPost = async(req, res = response) => {

    try{
        const { id } = req.params;
        let { userDB, votoRealizado } = req.body;
        let { _id, estado, google, voto,  ...resto } = userDB;
        

        const salt = bcryptjs.genSaltSync();
        const votoEncriptado = bcryptjs.hashSync( votoRealizado, salt ); 
        
        
        resto.estado = false;
        resto.voto = votoEncriptado;

        const usuario = await Usuario.findByIdAndUpdate( id, resto );

        res.json({
            msg: 'Voto Realizado',
        });
    }catch( err ){
        res.json({
            msg: err,
        })
    }

    
}


const usuariosGet = async(req, res = response ) => {


    
    let contSi = 0;
    let contNo = 0;
    let contNulo = 0;

    const query = { estado: false };

    const usuarios = await Usuario.find(query);

    usuarios.forEach( elemento => {

        let validadorDeVotosSi = bcryptjs.compareSync( 'Si', elemento.voto );
        if( validadorDeVotosSi ){
            contSi = contSi + 1; 
        }

        let validadorDeVotosNo = bcryptjs.compareSync( 'No', elemento.voto );
        if( validadorDeVotosNo ){
            contNo = contNo + 1; 
        }

        let validadorDeVotosNulo = bcryptjs.compareSync( 'Nulo', elemento.voto );
        if( validadorDeVotosNulo ){
            contNulo = contNulo + 1; 
        }
        
    });
    


    res.json({
        votosSi: contSi,
        votosNo: contNo,
        votosNulo: contNulo,
    })


}

module.exports = {

    usuariosGet,
    usuariosPost,
    
}