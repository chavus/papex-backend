// agregar queryparams para filtrar nombre producto
const express = require('express')
const isAuth = require("../middlewares/auth")
const products = require('../useCases/products')
const router = express.Router()

router.use(isAuth)

router.get('/', async (request, response) => {
  try {

    //const  filters  = {}     
    /*   Filtros de query params para refinar la busqueda

    const { businessId, name, category }  = request.query
  
    if (name) filters.name = name  

    if (age) 
    {        
        if ( is_min_age === "true" )         /// JSON.parse(is_min_age) 
        {
            filters.age =  { $gte: parseInt(age) }
        }
        else 
        {
            filters.age =  parseInt(age)
        }
    }    
    */

    const productos = await products.getAll()
    response.json( {
            success: true,
            message : 'Gell all products',
            data : productos
        })

    } 
    catch (error) {
            response.status(400)
            response.json({
            success: false,
            message: 'Get All products error ',
            data: error.message
            })
    }
})


router.get('/:id', async (request, response) => {
    try {
  
        const { id } = request.params
        console.log(id)

      const product = await products.getById(id)

            response.json( {
              success: true,
              message : 'Producto obtenido',
              data : product
          })  
      } 
      catch (error) {
              response.status(400)
              response.json({
              success: false,
              message: 'Error al obtener el producto',
              data: error.message
              })
      }
  })



router.post('/', async (request, response) => {
    try {
      const newProduct = request.body
      const productCreated = await products.create(newProduct)  

      response.json({
        success: true,
        message: 'Producto creado',
        data: productCreated
      })
    } 
    catch (error) {
        response.status(400)
        response.json({
        success: false,
        message: 'Error al crear el producto ',
        data: error.message
      })
    }
  })
  

  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params
      const productDeleted = await products.deleteById(id)  
      response.json({
        success: true,
        message: 'Producto borrado',
        data: productDeleted
      })
    } 
    catch (error) {
        response.status(400)
        response.json({
        success: false,
        message: 'Error al borrar el producto',
        data: error.message
      })
    }
  })

  
  router.patch('/:id', async (request, response) => {
    try 
    {
      const { id } = request.params
      const data = request.body
  
      const productUpdated = await products.updateById(id, data)
  
      response.json({
        success: true,
        message: 'Producto actualizado',
        data: productUpdated
      })
    } catch (error) {
      response.status(400)
      response.json({
        success: false,
        message: 'Error al actualizar el producto',
        data: error.message
      })
    }
  })
  
  module.exports = router