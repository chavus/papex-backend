const mongoose = require('mongoose')


// Schema
const orderSchema = new mongoose.Schema({
    parentOrder: {
        type: Number,
        required: true         
    },
    confirmation_code: {
        type: String,
        trim: true,
        required: true
    } ,
    status: {
        type: String,
        enum:['Entregado', 'En proceso'],
        required: true,
        trim: true
    } ,
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },  
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }, 
    products:     
    [
        {
            product :{ type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
            price : { type: Number, required: true },
            qty : { type: Number, required: true }
        }   
    ],
    deliveryMethod:{
        type: String,
        enum:['Pickup', 'Delivery'],
        required: true,
        trim: true        
    },
    deliveryCost:{
        type:Number
    },
    total:{
        type:Number
    },
    comment: {
        type: String,
        trim: true
    } 
}
, {timestamps: true} )   

orderSchema.statics.getNextOrder = async function(){
    const res = await this.find().sort('-parentOrder').limit(1)
    return res[0].parentOrder + 1 
}

const model = mongoose.model('orders', orderSchema )
module.exports = model
