const express = require("express")
const auth = require("../usecases/auth")
const router = express.Router()

router.post("/login", async (request, response) => {
    try{
        const {email, password} = request.body
        const token = await auth.login(email, password)
        response.json({
            success: true,
            message: "User logged in",
            data: { token }
        })
    }
    catch(error){
        response.status(400),
        response.json({
            success: false,
            message: "Unable to login",
            error: error.message
        })
    }

})

module.exports = router



