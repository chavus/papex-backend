const User = require ('../models/users')
const bcrypt = require('../lib/bcrypt')
const getDistance = require('../lib/distMatrixApi')
function getAll()
{
    return User.find()   
}

async function getNearBusiness(by, data, radius)      
{    
    let clientOrigin = ""
    if (by == "userId"){
        // 1.-Get direction from user-Client, from userInfo state
        const client = await getById(data)
        clientOrigin = client.address
    } else if (by == "userCoord"){
        clientOrigin = data
    }
    //2.- Filtro de negocios getaAllBusinesses() -> [{business}]
    //3.- Map para que regrese puras direcciones [direcciones]
    const allBusinesses = await getAllBusinesses()
    const businessesAddresses = allBusinesses.map( business => business.address)
    //4.- getDistance() -> [{idx:, dist:}] 
    const distArray = await getDistance(clientOrigin, businessesAddresses)
    //5.- [{business_obj + dist_info}] -> filter only dist specified 
    const extendedBusinesses = allBusinesses.map( (business, idx)=>{
        return {...business.toObject(), ...distArray[idx]}
    })
    const nearBusinesses = extendedBusinesses.filter( business => business.dist <= radius*1000)
    return nearBusinesses
}

function getById(id)
{
    return User.findById(id)
}

function deleteById(id)
{
    return User.findByIdAndDelete(id)
}

async function create(user)
{
    //Validate if user exists
    const userFound = await User.findOne({ email: user.email })
    if (userFound) throw new Error("Usuario con ese correo ya existe.")

    //Encrypt password
    const encryptedPassword = await bcrypt.hash(user.password)

    return User.create({...user, password: encryptedPassword})
}

function updateById(id, newData)
{
    return User.findByIdAndUpdate(id,newData, { new: true , runValidators : true})
}

function getAllBusinesses(){
    return User.find({ rol:"Negocio" })
}
module.exports = {

    getAll, 
    getNearBusiness,
    getById,
    deleteById,
    create,
    updateById,
    getAllBusinesses
}
