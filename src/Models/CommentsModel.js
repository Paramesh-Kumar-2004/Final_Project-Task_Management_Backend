import mongoose from "mongoose"



const CommentsSchema = mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comment: {
        type: String,
        required: true
    },
}, { timestamps: true })


const Comments = mongoose.model("Comments", CommentsSchema);
export default Comments