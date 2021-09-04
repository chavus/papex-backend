const mongoose = require('mongoose')


const daySchedule = new Schema( { day: 'string' , openTime: 'string'  ,  closeTime: 'string' })

// Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true,
        trim: true
    } ,
    email:{
        type: String,
        required: true,
        match: /.+@.*\..*/ 
    } ,
    password: {
        type: String,
        required: true,
        trim: true
    } ,
    phoneNumber: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
        trim: true
    } ,
    address: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true,
        trim: true
    } ,  
    rol: {
        type: String,
        minLength: 2,
        maxLength: 50,
        enum: ['Cliente', 'Negocio'],
        required: true,
        trim: true
    } ,  
    businessName: {
        type: String,
        minLength: 2,
        maxLength: 100,        
        trim: true
    } ,  
    schedule: [ {
        type: daySchedule
    } ]
    ,  
    deliveryMethod: [ {
        type: String,
        minLength: 2,
        maxLength: 50,
        enum: ['Pickup', 'Delivery'],
        trim: true
    } ] ,                              
    bankAccount: {
        type: String,
        minLength: 18,
        maxLength: 18,
        trim: true
    } 

},  {timestamps: true}

)   

const model = mongoose.model('users', userSchema )
module.exports = model

