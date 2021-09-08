const mongoose = require('mongoose')

// Schema
const orderCounterSchema = new mongoose.Schema({
    orderNumber: {
        type: Number         
    }
})

const model = mongoose.model('ordercounter', orderCounterSchema )
module.exports = model