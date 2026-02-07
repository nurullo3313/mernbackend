import mongoose  from "mongoose";


const CommentSchema = new mongoose.Schema({
    comment : {
        type:String,
        required :true,
    },
    author :{
        type : mongoose.Schema.Types.ObjectId,
        ref :"users"
    },
     username : {
        type: String
    },
},
{timestamps: true}
)


export default mongoose.model("comment" , CommentSchema)