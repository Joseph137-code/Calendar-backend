const express = require('express')
const cors = require ('cors')
const app = express()
require('dotenv').config()

const conectarDB = require('./database/config')

app.use(cors())

//Conectar a la Base de Datos
conectarDB();

app.use(express.static('public'));
app.use( express.json())

//Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))


app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})