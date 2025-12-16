import mongoose from "mongoose";



const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String
        },
        deadline: {
            type: Date,
            required: true
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending"
        },
        category: {
            type: String,
            enum: ["work", "personal", "project"],
            default: "work",
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
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
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;