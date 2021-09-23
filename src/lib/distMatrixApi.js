const axios = require("axios")
// require('dotenv').config({path:"../../.env"})

DMAPI_URL = "https://maps.googleapis.com/maps/api/distancematrix/json"
API_KEY = process.env.GOOGLE_API_KEY

async function getDistance(origin, destinations){
    const encodedOrigin = encodeURI(origin)
    const encodedDestinations = encodeURI(destinations.join("|"))
    const params = `origins=${encodedOrigin}&destinations=${encodedDestinations}&key=${API_KEY}`;
    console.log("params")
    console.log(params)
    let res =  await axios.get(`${DMAPI_URL}?${params}`)
    let distArray = res.data.rows[0].elements
    let resArray = distArray.map(item => {
        return {dist: item.distance.value, duration: item.duration.text }
    })
    return resArray
}

module.exports = getDistance

//To support coordinates
