// definición del servidor
const express = require('express')
const ordersRouter = require('./routers/orders')
const productsRouter = require('./routers/products')
const usersRouter = require('./routers/users')
const server = express()
const cors = require('cors')

/// const autRouter = require('./routers/auth')
// const logMiddle = require ('./middlewares/log')

// middleware
server.use(express.json()) // -> parsea todo lo que venga en mipaquete a un formato JSON
server.use(cors())


server.use((request, response, next) => {
    console.log('RequestMethod: ', request.method, ' RequestPath: ', request.path, ' RequestBody: ', request.body)
    next()
  })
  
server.use('/products', productsRouter)
  /// server.use('/auth', autRouter)  


module.exports = server




