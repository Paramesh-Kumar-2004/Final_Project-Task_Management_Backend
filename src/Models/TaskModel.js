import mongoose from 'mongoose';


const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
    },
    category: {
        type: String,
        enum: ["work", "personal", "prjects"],
        default: "personal",
        lowercase: true
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
        lowercase: true
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low",
        lowercase: true
    },
    deadline: {
        type: Date,
        default: Date.now() + 7 * 24 * 60 * 60 * 1000 // 1 Week From Now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    sharedWith: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            permission: {
                type: String,
                enum: ["view", "edit"],
                default: "view"
            }
        }
    ]
}, { timestamps: true });


const Task = mongoose.model("Task", taskSchema);
export default Task;