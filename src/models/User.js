import mongoose from "mongoose";


const UserModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "post"
        }
    ]

},
    { timestamps: true }
)

export default mongoose.model("users", UserModel)