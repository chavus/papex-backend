const express = require('express')
const users = require('../useCases/users')
const isAuth = require("../middlewares/auth")
const router = express.Router()

router.get('/', async (request, response) => { // Need to add isAuth
  try {
    const usuarios = await users.getAll()
    response.json( {
            success: true,
            message : 'Obtener todos los usuarios',
            data : usuarios
        })

    } 
    catch (error) {
            response.status(400)
            response.json({
            success: false,
            message: 'Error al obtener todos los usuarios',
            data: error.message
            })
    }
})

router.get('/:id', isAuth, async (request, response) => {
    try {
  
        const { id } = request.params
        console.log(id)

      const usuario = await users.getById(id)

            response.json( {
              success: true,
              message : 'Usuario obtenido',
              data : usuario
          })  
      } 
      catch (error) {
              response.status(400)
              response.json({
              success: false,
              message: 'Error al obtener el usuario',
              data: error.message
              })
      }
  })


  router.post('/', async (request, response) => {
    try {
      const newUser = request.body
      const usuarioCreado = await users.create(newUser)  

      response.json({
        success: true,
        message: 'Usuario creado',
        data: usuarioCreado
      })
    } 
    catch (error) 
    {
        response.status(400)
        response.json({
        success: false,
        message: 'Error al crear el Usuario ',
        data: error.message })
    }
  })
  

  router.delete('/:id', isAuth, async (request, response) => {
    try {
      const { id } = request.params
      const usuarioBorrado = await users.deleteById(id)  
      response.json({
        success: true,
        message: 'Usuario borrado',
        data: usuarioBorrado
      })
    } 
    catch (error) {
        response.status(400)
        response.json({
        success: false,
        message: 'Error al borrar el usuario',
        data: error.message
      })
    }
  })

  
  router.patch('/:id', isAuth, async (request, response) => {
    try 
    {
      const { id } = request.params
      const data = request.body
  
      const usuarioActualizado = await users.updateById(id, data)
  
      response.json({
        success: true,
        message: 'Usuario actualizado',
        data: usuarioActualizado
      })
    } catch (error) {
      response.status(400)
      response.json({
        success: false,
        message: 'Error al actualizar el usuario',
        data: error.message
      })
    }
  })

  router.get('/:id/getNearBusinesses', async (request, response) => { // Need to add isAuth
    try {
      const { id } = request.params
      const usuarios = await users.getNearBusiness(id)
      response.json( {
              success: true,
              message : 'Obtener todos los negocios cercanos al cliente',
              data : usuarios
          })
  
      } 
      catch (error) {
              response.status(400)
              response.json({
              success: false,
              message: 'Error al obtener todos los negocios',
              data: error.message
              })
      }
  })

  module.exports = router