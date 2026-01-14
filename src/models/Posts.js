import mongoose from "mongoose";



const Posts = new mongoose.Schema({
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
        typeof :String,
        default  : ""
    },
    author:{
        type :mongoose.Schema.Types.ObjectId,
        ref : "users"
    }
    
},
{timestamps: true}
)

export default mongoose.model("posts" , Posts)