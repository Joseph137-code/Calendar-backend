const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const {validationField} = require('../middlewares/validation')
const {validateJwt} = require('../middlewares/validationJwt')
const {newUser, login, token  } = require('../controllers/authController')


/* ruta es /api/auth */

router.post(
    '/register',
    [   
        check('name', 'el Nombre es Obligatorio').not().isEmpty(),
        check('email', 'el Email es Obligatorio').isEmail(),
        check('password', 'el Password debe ser mayor a 6 caracteres').isLength({min:6}),
        validationField
    ],newUser 
)

router.post(
    '/login',
    [
        check('email', 'el Email es Obligatorio').isEmail(),
        check('password', 'el Password debe ser mayor a 6 caracteres').isLength({min:6}),
        validationField
    ],login
)

router.get('/renew',validateJwt, token)

module.exports = router;