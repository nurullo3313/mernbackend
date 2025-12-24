import mongoose from "mongoose"
import "dotenv/config"

const dbName = process.env.DB_NAME
const dbPassword = process.env.DB_PASSWORD

export default async ()=>{
    try{
      await  mongoose.connect("mongodb://localhost:27017/mern")
        console.log("База данных работаеть!!")
    }catch(error){
       console.log("Не удалос подключться на базу данных!" , error) 
    }
}