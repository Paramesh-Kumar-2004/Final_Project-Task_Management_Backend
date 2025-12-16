import mongoose from "mongoose";



const collaborationSchema = mongoose.Schema({
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
    collabuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    control: {
        type: String,
        enum: ["read", "edit"],
        default: "read"
    }
}, { timestamps: true })


const Collaboration = mongoose.model("Collaboration ", collaborationSchema);
export default Collaboration