const User = require ('../models/users')

function getAll()
{
    return User.find()   
}

// regresa los negocios que se encuentran a menos de 2 kms del usuario
// recibe como parametro el id del usuario tipo cliente  cliente 
function getNearBusiness(id)      
{    
    // traerte todos los negocios
    // sacar distancias vs la api de google
    // evaluar si esta a menos o igual a 2 kms (2000 mts) 
    // devuelvo un array de usuarios tipo negocio que cumplan con el criterio
    // como ? quien sabe
    return  1

}

function getById(id)
{
    return User.findById(id)
}

function deleteById(id)
{
    return User.findByIdAndDelete(id)
}

function create(user)
{
    return User.create(user)
}

function updateById(id, newData)
{
    return User.findByIdAndUpdate(id,newData, { new: true , runValidators : true})
}

module.exports = {

    getAll, 
    getNearBusiness,
    getById,
    deleteById,
    create,
    updateById
}

