import { json } from "express"
import jwt from "jsonwebtoken"

export const checkAuth = (req , res , next)=>{
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "")

    if(token){
        try{
            const decodec = jwt.verify(token , process.env.JWT_SECRET)

           req.userId = decodec.id
           next()
        }catch(error){
            res.status(500).json({msg:"Нет доступа!!"})
        }

    }else{
        res.status(401).json({
            msg: "Нет доступа!"
        })
    }
}