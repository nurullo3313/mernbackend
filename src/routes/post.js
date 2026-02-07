import { Router } from "express";
import {  createPost, deletePost, getAllPost, getOnePost, myPosts,updatePost ,getComments} from "../controllers/post.js";
import { checkAuth } from "../utils/checkAuth.js";





const router = new Router()

router.post("/createpost" ,checkAuth, createPost)
router.get("/getallpost" ,checkAuth, getAllPost)
router.get("/getonepost/:id" ,checkAuth,getOnePost)
router.get("/myposts", checkAuth , myPosts)
router.delete("/deletepost/:id", checkAuth , deletePost)
router.put("/updatepost/:id", checkAuth , updatePost)

router.get("/comments/:id", checkAuth , getComments)






export default router