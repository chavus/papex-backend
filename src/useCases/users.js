const User = require ('../models/users')
const bcrypt = require('../lib/bcrypt')
const getDistance = require('../lib/distMatrixApi')
function getAll()
{
    return User.find()   
}

async function getNearBusiness(id)      
{    
    const origin= "Volcán Maunaloa 2826, Colli Urbano, 45070 Zapopan, Jal., Mexico"
    //1.-Get direction from user-Client, from userInfo state
    const client = await getById(id)
    const clientAddress = client.address
    //2.- Filtro de negocios getaAllBusinesses() -> [{business}]
    //3.- Map para que regrese puras direcciones [direcciones]
    const allBusinesses = await getAllBusinesses()
    const businessesAddresses = allBusinesses.map( business => business.address)
    // console.log(businessesAddresses)
    //4.- getDistance() -> [{idx:, dist:}] 
    const distArray = await getDistance(clientAddress, businessesAddresses)
    //5.- [{business_obj + dist_info}] -> filter only dist specified 
    const extendedBusinesses = allBusinesses.map( (business, idx)=>{
        return {...business.toObject(), ...distArray[idx]}
    })
    return extendedBusinesses
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
