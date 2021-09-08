const Counter = require ('../models/ordercounter')

function getNextOrder(id)
{
    return Counter.findById(id) 
}
/*
function updateOrderCounter(id, newData)
{
    return Counter.findByIdAndUpdate(id,newData, { new: true })
}
*/
module.exports = {
    getNextOrder

}
