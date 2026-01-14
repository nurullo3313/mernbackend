import { Router } from "express";
import { register , login , getMe } from "../controllers/user.js";
import { checkAuth } from "../utils/checkAuth.js";
import { loginValigator, registerValigator } from "../validators/authValidator.js";



const router =  new Router()


router.post("/register",registerValigator, register)
router.post("/login", loginValigator, login)
router.get("/me",checkAuth, getMe)




export default router