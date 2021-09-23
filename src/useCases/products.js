const Product = require ('../models/products')

function getAll(filter)
{    
    return Product.find(filter).populate("business")   
}

function  getAllByName(name)
{
    return Product.find( {name: {$regex:name , $options: 'i'}   })
}

function getById(id)
{
    return Product.findById(id).populate("business")   
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

// function getByBusinessId(id){
//     return Product.find({"business":id}).populate("business")
// }

module.exports = {
    getAll, 
    getById,
    deleteById,
    create,
    updateById,
    getAllByName
    // getByBusinessId
}

