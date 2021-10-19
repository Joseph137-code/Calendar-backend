const {response} = require('express')
const Evento = require('../models/Events')

const getEvents = async (req, res = response) => {
    const eventos = await Evento.find()
                                .populate('user','name');

    res.json({
        ok: true,
        eventos
    });
}

const newEvent = async(req, res= response) => {

    const evento = new Evento(req.body)

    try {
        evento.user = req.uid;
        const eventSave = await evento.save();

        res.json({
            ok: true,
            evento: eventSave
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al crear Evento'
        });
    }
}

const updateEvent = async (req, res= response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Id de evento no encontrado'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const eventNew = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Evento.findByIdAndUpdate( eventId, eventNew, { new: true } );

        res.json({
            ok: true,
            evento: eventUpdated
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al editar el evento'
        });
    }
}

const deleteEvent = async (req, res= response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Id de evento no encontrado'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }


        await Evento.findByIdAndDelete( eventId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error al eliminar el evento'
        });
    }
}

module.exports = {getEvents, newEvent, updateEvent, deleteEvent}