const mongoose = require('mongoose')

const {DB_USER, BD_PASSWORD, DB_HOST, DB_NAME } = process.env

const URL = `mongodb+srv://${DB_USER}:${BD_PASSWORD}@${DB_HOST}/${DB_NAME}`

//connect devuelve una promesa, pero en este archivo no se va a llamar 
//se va a generar una función para ue cuando se llame se ejecute la promesa de la conexión anterior

function connect () {
    return mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology:true})
}

function close(){
    return mongoose.connection.close()
}

module.exports = {connect, close, connection: mongoose.connection }
