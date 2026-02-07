import User from "../models/User.js";
import Comment from "../models/Comment.js"
import Posts from "../models/Posts.js";

export const addComment = async (req, res)=>{
    try {
        
        const {postId ,comment} = req.body

           const user = await User.findById(req.userId);
           
           if(!user){
            return   res.status(404).json({
                    msg : "Ползовател не найден"
                })
           }
            if(!comment){
            return   res.status(404).json({
                    msg : "Комментария не дожен быт пустым"
                })
           }

           const newComment = new Comment({
            comment,
            author : user._id,
            username: user.username
           })

         await  newComment.save()

         try {
            await Posts.findByIdAndUpdate(postId,{
                    $push:{comments : newComment._id}
            })
         } catch (error) {
            
         }

           return res.status(201).json({
            msg : "Коммент прошло успешо!!",
            newComment
           })


       



    } catch (error) {
        return res.status(500).json({
            msg : "Ошибка при пост коммент!!"
        })
        console.log(error)
    }
}