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
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }]              
}
, {timestamps: true} )   

const model = mongoose.model('orders', orderSchema )
module.exports = model
