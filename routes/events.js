const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const {validationField} = require('../middlewares/validation')
const {validateJwt} = require('../middlewares/validationJwt')
const {getEvents, newEvent, updateEvent, deleteEvent} = require('../controllers/eventController')
const {isDate} = require('../helper/isDate')

/* ruta es /api/events */

router.use(validateJwt)

router.get('/', [
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom( isDate ),
    check('end','Fecha de finalización es obligatoria').custom( isDate ),
    validationField
], getEvents)

router.post('/', newEvent)

router.put('/:id', updateEvent)

router.put('/:id', deleteEvent)


module.exports = router;