import { Router } from "express"
import { addComment } from "../controllers/comment.js"
import { checkAuth } from "../utils/checkAuth.js"


const router = new Router()


router.post("/addcomment/:id",checkAuth, addComment )


export default router