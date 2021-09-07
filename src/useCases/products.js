const Product = require ('../models/products')

function getAll()
{
    return Product.find() //.populate({ path: 'business', model: 'users' })    
}

function getById(id)
{
    return Product.findById(id) //.populate("business")
}

function deleteById(id)
{
    return Product.findByIdAndDelete(id)
}

function create(product)
{
    return Product.create(product)
}

function updateById(id, newData)
{
    return Product.findByIdAndUpdate(id,newData, { new: true , runValidators : true})
}

module.exports = {
    getAll, 
    getById,
    deleteById,
    create,
    updateById
}

