// Instancias de servidor y BD.
require('dotenv').config()

const server = require('./src/server')
const dbConnect = require('./src/lib/db')

dbConnect()
    .then(()=>{
        console.log("DB connected");
        server.listen(8080, ()=>{
            console.log("Server listening at :8080");
        })
    })
    .catch( err => console.error(err))
