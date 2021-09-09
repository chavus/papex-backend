const User = require("../models/users")
const bcrypt = require("../lib/bcrypt")
const jwt = require("../lib/jwt")

async function login(email, password){
    const userFound = await User.findOne({ email })
    if (!userFound) throw new Error("Invalid Credentials")

    const isValidPassword = await bcrypt.compare(password, userFound.password)
    if (!isValidPassword) throw new Error("Invalid Credentials")

    // regresar un token
    return jwt.sign({ id: userFound._id })
}

module.exports = { login }