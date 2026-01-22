import { Router } from "express";
import {  createPost, getAllPost } from "../controllers/post.js";
import { checkAuth } from "../utils/checkAuth.js";





const router = new Router()

router.post("/createpost" ,checkAuth, createPost)
router.get("/getallpost" ,checkAuth, getAllPost)



export default router