const {response} = require('express')
const jwt = require('jsonwebtoken');

const validateJwt = (req, res = response, next ) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false, 
            msg: 'no hay token en la petición' 
        });
    }

    try {
        const {uid, name} = jwt.verify(token, process.env.SECRETA );
        req.uid= uid;
        req.name= name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false, 
            msg: 'token no válido' 
        }); 
    }

    next();

}

module.exports = { validateJwt}