import express from "express"
import 'dotenv/config'
import db from "./config/db.js"
import authRouter from "./routes/auth.js"
import postRouter from "./routes/post.js"
import cors from "cors"
import fileUpload from "express-fileupload"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors())
app.use(fileUpload())
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

db()



app.use("/api/auth",authRouter)
app.use("/api/post",postRouter)




app.get("/",(req,res)=>{
    return res.json({msg : "сервер работаеть!!"})
})


app.listen(PORT,()=>{
    console.log("Sever OK" + ` http://localhost:${PORT}`)
})






