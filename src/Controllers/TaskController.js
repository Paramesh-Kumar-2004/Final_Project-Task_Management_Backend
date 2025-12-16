import Task from "../Models/TaskModel.js";
import User from "../Models/UserModel.js";



export const createTask = async (req, res) => {
    try {

        const { title, description, priority, category, deadline, assignedTo } = req.body;

        let fileUrl = null
        if (req.file) {
            fileUrl = `${req.protocol}://${req.get("host")}/${req.file.path.replace(/\\/g, "/")}`;
        }

        const newTask = new Task({
            title,
            description,
            priority,
            category,
            deadline,
            assignedTo,
            fileUrl,
            createdBy: req.user._id
        });
        const task = new Task(newTask);
        await task.save();

        res.status(201).json({
            success: true,
            message: "Task created successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getAllTasks = async (req, res) => {
    try {

        console.log("Entered Into Get Tasks")

        const tasks = await Task.find({
            $or: [
                { createdBy: req.user._id },
                { assignedTo: req.user._id },
                { "sharedWith.user": req.user._id }
            ]
        })
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email")
            // .populate("sharedWith.user", "name email")
            .sort({ deadline: 1 });

        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            tasks
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getSingleTask = async (req, res) => {
    try {

        console.log("Entered Into Get Single Task")
        const { id } = req.params

        const task = await Task.find({ _id: id }).populate("createdBy").populate("sharedWith")

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task Not Found"
            })
        }

        res.status(200).json({
            message: "Task Details Fetched Successfully",
            task,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Sever Error"
        })
    }
}


export const updateTask = async (req, res) => {
    try {
        console.log("Entered Update Task")

        const { id } = req.params;
        const { taskData } = req.body;

        const updateTask = await Task.findByIdAndUpdate(
            id,
            { $set: taskData },
            { new: true }
        )

        res.status(200).json({
            message: "Task Updated Successfully",
            updateTask
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Sever Error"
        })
    }
}


export const shareTask = async (req, res) => {
    try {
        console.log("Entered Into Share Task")

        const { userId, permission } = req.body;
        const task = await Task.findById(req.params.taskid);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        if (!task.createdBy.equals(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: "Only creator can share this task"
            });
        }

        task.sharedWith.push({ user: userId, permission });
        await task.save();

        res.status(200).json({ success: true, task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getSharedTasks = async (req, res) => {
    try {

        console.log("Entered Into Get Tasks")

        const tasks = await Task.find({
            $or: [
                { assignedTo: req.user._id },
                { "sharedWith.user": req.user._id }
            ]
        })
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email")
            .populate("sharedWith.user", "name email")
            .sort({ deadline: 1 });

        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            tasks
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const deleteTask = async (req, res) => {
    try {

        console.log("Entered Into Delete Task")
        const { id } = req.params

        const deletetask = await Task.findByIdAndDelete(id)

        res.status(200).json({
            message: "Task Deleted Successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Sever Error"
        })
    }
}