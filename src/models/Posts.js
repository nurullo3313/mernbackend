import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    username : {
        type: String
    },
    title:{
        type :String,
        required : true
    },
    text:{
        type : String,
        required: true
    },
    view:{
        type : Number,
        default : 0
    },
    imgUrl : {
        type :String,
        default  : ""
    },
    author:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    comments : [{type:mongoose.Schema.Types.ObjectId , ref :"comment"}]
    
},
{timestamps: true}
)

export default mongoose.model("posts" , PostSchema)