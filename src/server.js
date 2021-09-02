// definición del servidor
const express = require('express')
const ordersRouter = require('./routers/orders')
const productsRouter = require('./routers/products')
const usersRouter = require('./routers/users')
const server = express()
const cors = require('cors')

module.exports = server