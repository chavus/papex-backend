// agregar queryparams para filtrar nombre producto
const express = require('express')
const isAuth = require("../middlewares/auth")
const orders = require('../useCases/orders')
const router = express.Router()
const STRIPE_KEY = process.env.STRIPE_KEY
const stripe = require('stripe')(STRIPE_KEY)

//router.use(isAuth)

router.get('/', async (request, response) => {
  try {

    
    const ordenes = await orders.getAll()
    response.json( {
            success: true,
            message : 'Obtener todas las ordenes',
            data : ordenes
        })

    } 
    catch (error) {
            response.status(400)
            response.json({
            success: false,
            message: 'Error al obtener todas las ordenes',
            data: error.message
            })
    }
})


router.get('/:id', async (request, response) => {
    try {
  
        const { id } = request.params
        console.log(id)

      const orden = await orders.getById(id)

            response.json( {
              success: true,
              message : 'Orden obtenida',
              data : orden
          })  
      } 
      catch (error) {
              response.status(400)
              response.json({
              success: false,
              message: 'Error al obtener la orden',
              data: error.message
              })
      }
  })

router.post('/', async (request, response) => {
    try {
      const nuevaOrden = request.body
      const ordenCreada = await orders.create(nuevaOrden)  

        response.json({
        success: true,
        message: 'Orden creada',
        data: ordenCreada
      })
    } 
    catch (error) {
        response.status(400)
        response.json({
        success: false,
        message: 'Error al crear la orden ',
        data: error.message
      })
    }
  })


router.post('/multipleorders', async (request, response) => {
  try {
    const shoppingcart = request.body
    console.log(shoppingcart.data)
    const ordenesCreadas = await orders.createMultipleOrders(shoppingcart.data)  

      response.json({
      success: true,
      message: 'Ordenes multiples creadas',
      data: ordenesCreadas
    })
  } 
  catch (error) {
      response.status(400)
      response.json({
      success: false,
      message: 'Error al crear multiples ordenes ',
      data: error.message
    })
  }
})

router.post('/siblingsOrders', async (request, response)=>{

  const ordersData = request.body
  try{
    const ordenesCreadas = await orders.createSiblingsOrders(ordersData)  
    response.json({
    success: true,
    message: 'Ordenes hermanas creadas',
    data: ordenesCreadas
  })
  } 
  catch (error) {
    response.status(400)
    response.json({
    success: false,
    message: 'Error al crear ordenes hermanas',
    data: error.message
  })
  }

})

router.post('/create-checkout-session', async (request, response) => {

  const checkout_data = request.body

  try{
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
        //   // TODO: replace this with the `price` of the product you want to sell
          price_data: {
            currency: "MXN",
            product_data:{
              name: "Monto total a pagar:",
              images: ["https://cdn3.vectorstock.com/i/1000x1000/36/17/online-cart-checkout-icon-vector-24873617.jpg"]
            },
            unit_amount: checkout_data.total*100 
          },
          // price: 'price_1JZUfBGDyyGYQjmYW5z5dAN8',
          quantity: 1,
        },
      ],
      payment_method_types: [
        'card',
      ],
      mode: 'payment',
      success_url: `${checkout_data.domain}?status=success`,
      cancel_url: `${checkout_data.domain}?status=cancelled`,
    });
  
    response.json({
      success: true,
      message: 'Checkout session created',
      data: session.url
    })
  }
  catch (error) {
    response.status(400)
    response.json({
    success: false,
    message: 'Error al crear checkout session de stripe',
    data: error.message
  })
}
});
  

  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params
      const ordenBorrada = await orders.deleteById(id)  
      response.json({
        success: true,
        message: 'Orden borrada',
        data: ordenBorrada
      })
    } 
    catch (error) {
        response.status(400)
        response.json({
        success: false,
        message: 'Error al borrar la orden',
        data: error.message
      })
    }
  })

  
  router.patch('/:id', async (request, response) => {
    try 
    {
      const { id } = request.params
      const data = request.body
  
      const ordenActualizada = await orders.updateById(id, data)
  
      response.json({
        success: true,
        message: 'Orden actualizada',
        data: ordenActualizada
      })
    } catch (error) {
      response.status(400)
      response.json({
        success: false,
        message: 'Error al actualizar la orden',
        data: error.message
      })
    }
  })
  
  module.exports = router