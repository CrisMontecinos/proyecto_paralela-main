
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
} = require('../middlewares');


const {  emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { 
        usuariosGet,
        usuariosPost,
        
} = require('../controllers/usuarios');

const router = Router();


router.post('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosPost );


router.get('/', usuariosGet

);

module.exports = router;