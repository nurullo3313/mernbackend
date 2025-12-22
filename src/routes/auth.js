import { Router } from "express";
import { register , login , getMe } from "../controllers/user.js";


const router =  new Router()


router.post("/register", register)
router.post("/lohin", login)
router.get("/me", getMe)




export default router