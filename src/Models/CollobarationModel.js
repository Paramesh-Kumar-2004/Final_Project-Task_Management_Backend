import mongoose from "mongoose";



const collobarationSchema = mongoose.Schema({
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
    collobuser: {
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



const Collobaration = mongoose.model("Collobaration", collobarationSchema);
export default Collobaration;