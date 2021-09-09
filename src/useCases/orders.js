const Order = require ('../models/orders')

function getAll()
{
    return Order.find().populate("business").populate("client").populate("products.product")     
}

function getById(id)
{
    return Order.findById(id).populate("business").populate("client").populate("products.product")  
}

function deleteById(id)
{
    return Order.findByIdAndDelete(id)
}

function create(order)
{
    return Order.create(order)
}

function updateById(id, newData)
{
    return Order.findByIdAndUpdate(id,newData, { new: true , runValidators : true})
}


async function getNextOrder()
{    
   let maxorden =  await Order.find()
   .sort("-parentOrder")
   .limit(1)

   return parseInt(maxorden[0].parentOrder) + 1

}

/*
function createMultipleOrders (   )   ///  {}
{

        ordenPadre = getNextOrder()

        carrito.foreach (  orden => {

                    create(orden)   /// agregar la orden padre 

        }   )


}
*/


module.exports = {
    getAll, 
    getById,
    deleteById,
    create,
    updateById,
    getNextOrder
}

