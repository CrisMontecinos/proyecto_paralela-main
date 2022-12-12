const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { updateMany } = require('../models/usuario');


const googleSignin = async(req, res = response) => {

    const { id_token } = req.body;
    
    try {
        const { correo, nombre, img } = await googleVerify( id_token );

        
        if( correo.endsWith('@utem.cl') ){

            let usuario = await Usuario.findOne({ correo });

            if ( !usuario ) {
                // Tengo que crearlo
                const salt = bcryptjs.genSaltSync();
                const aunNoVota = 'Aun no vota';
                let voto = bcryptjs.hashSync( aunNoVota, salt );

                const data = {
                    nombre,
                    correo,
                    img,
                    estado: true,
                    google: true,
                    voto
                };

                usuario = new Usuario( data );
                await usuario.save();
            }

            // Si el usuario en DB
            if ( !usuario.estado )  {
                return res.json({
                    msg: 'USUARIO YA VOTO'
                });
            }

            // Generar el JWT
            const token = await generarJWT( usuario.id );
            
            res.json({
                usuario,
                token
            });

        }else{

            return res.json({
                msg: 'Debe ser correo institucional UTEM'
            });

        }

        
        
    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido'
        })

    }



}

const renovarToken = async( req, res = response ) => {

    const { usuario } = req;
    const token = await generarJWT( usuario.id );

    res.json({
        usuario,
        token
    })


}

module.exports = {

    googleSignin,
    renovarToken
}
