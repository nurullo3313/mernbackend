import mongoose from "mongoose"
import "dotenv/config"

const dbName = process.env.DB_NAME
const dbPassword = process.env.DB_PASSWORD

export default ()=>{
    try{
        mongoose.connect(`mongodb+srv://${dbName}:${dbPassword}@cluster0.8btubcs.mongodb.net/`)
        .then(console.log("База данных работаеть!!"))
    }catch(error){
       console.log("Не удалос подключться на базу данных!") 
    }
}