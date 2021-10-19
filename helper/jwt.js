const jwt = require('jsonwebtoken');

const generatejwt = (uid, name) => {
    return new Promise((resolve, reject) => {

        const payload ={uid, name}

        const token = jwt.sign( payload, process.env.SECRETA, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('no se pudo generar el Token')
            }

            resolve(token);
        });

        res.json({ token })

    })
}

module.exports = {generatejwt}