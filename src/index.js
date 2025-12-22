import express from "express"

import 'dotenv/config'
import db from "./config/db.js"
import authRouter from "./routes/auth.js"


const PORT = process.env.PORT
const app = express()
app.use(express.json())
db()


app.use("/api/auth",authRouter)

app.get("/",(req,res)=>{
    return res.json({msg : "сервер работаеть!!"})
})


app.listen(PORT,()=>{
    console.log("Sever OK" + ` http://localhost:${PORT}`)
})






