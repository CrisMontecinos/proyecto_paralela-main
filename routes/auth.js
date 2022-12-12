const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos, validarJWT } = require('../middlewares');


const { googleSignin, renovarToken } = require('../controllers/auth');


const router = Router();

router.post('/google',[
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignin );

router.get('/', validarJWT, renovarToken );

module.exports = router;