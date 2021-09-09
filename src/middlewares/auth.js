const jwt = require("../lib/jwt")


function isAuth(request, response, next){
    try{
        const { authorization: token } = request.headers
        const isValidToken = jwt.verify(token)
        if (!isValidToken) throw new Error("Not Authorized")
        next()
    }
    catch(error){
        response.status(401)
        response.json({
            success: false,
            message: "Not authorized",
            error: error.message
        })
    }
}

module.exports = isAuth