// agregar queryparams para filtrar nombre producto

const express = require('express')
const ordercounter = require('../useCases/ordercounter')
const router = express.Router()

router.get('/',  (request, response) => {


        console.log('hola')
    /*
  try {    
    const ordenSiguiente =  ordercounter.getNextOrder()
    response.json( {
            success: true,
            message : 'Obtiene siguiente folio orden',
            data : ordenSiguiente
        })

    } 
    catch (error) {
            response.status(400)
            response.json({
            success: false,
            message: 'Error al obtener siguiente folio orden',
            data: error.message
            })
    }
    */
})