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
    // confirmation_code format: 
        //date[last six] + "papex" + parentorder
    const confirmation_code = `${Date.now().toString().slice(-5)}PAPEX${order.parentOrder}`
    return Order.create({...order,
        confirmation_code})
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


async function createMultipleOrders (shoppingcart)   ///  {}
{

        const DELIVERY_COST = 35 
        /*
       shoppingcart = [   
        {   product : "a",
            business :  "n2", 
            price : 5.50, 
            qty : 1 , 
            client: "1",
            deliveryMethod: "Delivery/Pickup",
            comment: "Some string"
        }   ]  
        */  
        let idParentOrder = await getNextOrder()

        // 1.- saco todos los negocios sin importar que se repitan
        let  business = shoppingcart.map ( item => item.business  ) 
 
        // 2.- filtro  negocios para que sean unicos 
        let uniqueBusinesses = []
        business.forEach ( item => {  
                    return !uniqueBusinesses.includes(item) ? uniqueBusinesses.push(item) : null
        } )
        // los ordeno
        uniqueBusinesses.sort()

        // 3.-  saco los productos que vende cada negocio

        let orderPerBusiness =  uniqueBusinesses.map (  (business, index) => {                   
        let order = {}
        
        const productsArray = shoppingcart.filter (   (itemCart)  => { 
            let itemCartFiltered = {}
            
            if (itemCart.business == business)
            {
                let { product , qty, price } = itemCart
                itemCartFiltered = { "product" : product, "price" : price, "qty" : qty }
                //console.log (itemCartFiltered)
                return itemCartFiltered
            }
        })

        const total = productsArray.reduce((accum, current)=>{
            return accum + current.price*current.qty 
        },0)

        return  order = {   "business" : business  , 
                            "client"   : shoppingcart[index].client, 
                            "status"   : "En proceso", 
                            "parentOrder" : idParentOrder,
                            "products" :  productsArray,
                            "deliveryMethod" : shoppingcart[index].deliveryMethod,                                                                           "deliveryCost": shoppingcart[index].deliveryMethod == "Delivery" ? DELIVERY_COST : 0,        
                            "total": shoppingcart[index].deliveryMethod == "Delivery" ? total + DELIVERY_COST : total,
                            "comment": shoppingcart[index].comment
                            }})

        //console.log (orderPerBusiness)
        let createdOrders = []
        for ( const order of orderPerBusiness )
        {
             const res = await create(order)
             console.log(res)
             createdOrders.push(res)
        }
        return createdOrders
}



module.exports = {
    getAll, 
    getById,
    deleteById,
    create,
    updateById,
    getNextOrder,
    createMultipleOrders
}

