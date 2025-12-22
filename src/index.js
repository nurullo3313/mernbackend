import express, { json } from "express"

import 'dotenv/config'
import db from "./config/db.js"


const PORT = process.env.PORT
const app = express()
app.use(json())
db()


app.listen(PORT,()=>{
    console.log("Sever OK" + ` http://localhost:${PORT}`)
})






