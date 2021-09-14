require('dotenv').config({path:"../../.env"})

const db = require("./db")
const users = require("../useCases/users")

const usersList = [
    {
        businessName: "Pape Uno",
        name: "Prop",
        lastName: "Uno",
        phoneNumber:"3315262902",
        email: "puno@gmail.com",
        password: "password",
        address: "Amado Nervo 1717, Kodak, 45050 Zapopan, Jal.",
        rol: "Negocio"
    },
    {
        businessName: "Pape Dos",
        name: "Prop",
        lastName: "Dos",
        phoneNumber:"3315262902",
        email: "pdos@gmail.com",
        password: "password",
        address: "Av Mariano Otero 4047, La Calma, 45070 Zapopan, Jal.",
        rol: "Negocio"
    },
    {
        businessName: "Pape Tres",
        name: "Prop",
        lastName: "Tres",
        phoneNumber:"3315262902",
        email: "ptres@gmail.com",
        password: "password",
        address: "Av. Adolfo López Mateos Sur 2718, Cd del Sol, 45050 Zapopan, Jal.",
        rol: "Negocio"
    },
    {
        businessName: "Pape Cuatro",
        name: "Prop",
        lastName: "Cuatro",
        phoneNumber:"3315262902",
        email: "pcuatro@gmail.com",
        password: "password",
        address: "Av. Cuauhtémoc 145, Cd del Sol, 45050 Zapopan, Jal.",
        rol: "Negocio"
    },
    {
        businessName: "Pape Cinco",
        name: "Prop",
        lastName: "Cinco",
        phoneNumber:"3315262902",
        email: "pcinco@gmail.com",
        password: "password",
        address: "Av Adolfo López Mateos Nte 73, Vallarta Nte., 44690 Guadalajara, Jal.",
        rol: "Negocio"
    }
]

async function uploadUsers(){
    try{
        console.log("Openning DB connection")
        await db.connect()
        console.log(db.connection.readyState)
        for (const user of usersList){
            await users.create(user)
        }
    }
    catch(error){
        console.log(error)
    }
    finally{
        await db.close()
        console.log("Connection closed")
    }
}

async  function getUsers(){
    try{
        console.log("Openning DB connection")
        await db.connect()
        let res = await users.getAll()
        return res
    }
    catch(error){
        console.log(error)
    }
    finally{
        await db.close()
        console.log("Connection closed")
    }
}

async function run(){
    // uploadUsers()
    let res = await getUsers()
    console.log(res)
}

// run()