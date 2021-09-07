const mongoose = require('mongoose')

// Schema
const productSchema = new mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
       
    },
    name: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true,
        trim: true
    } 
    ,
    imageUrl: {
        type: String,       
        trim: true
    } ,
    category:{
        type: String,
        required: true,
        enum:['Papel', 'Libretas y cuadernos', 'Arte y diseño', 'Articulos de escritorio', 'Articulos de escritura']
    } ,
    brand: {
        type: String,
        trim: true
    } ,
    description: {
        type: String,
        minLength: 2,        
        maxLength: 200,
        required: true,
        trim: true
    } ,
    price: {
        type: Number,
        required: true        
    } ,  
    available: {
        type: Boolean,
        required: true

    }   
   
} ,  {timestamps: true} )   

const model = mongoose.model('products', productSchema )
module.exports = model
