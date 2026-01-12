import express from "express"

import 'dotenv/config'
import db from "./config/db.js"
import authRouter from "./routes/auth.js"
import cors from "cors"


const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors())
db()



app.use("/api/auth",authRouter)

app.get("/",(req,res)=>{
    return res.json({msg : "сервер работаеть!!"})
})


app.listen(PORT,()=>{
    console.log("Sever OK" + ` http://localhost:${PORT}`)
})






