import Collaboration from "../Models/CollaborationModel.js";
import Task from "../Models/TaskModel.js";
import User from "../Models/UserModel.js";



export const createTask = async (req, res) => {
    try {

        const { title, description, priority } = req.body;
        const newTask = new Task({
            title,
            description,
            priority,
            user: req.user._id
        });

        const task = new Task(newTask);
        await task.save();

        res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getAllTasks = async (req, res) => {
    try {

        console.log("Entered Into Get Tasks")

        const tasks = await Task.find({ user: req.user._id }).populate("user");
        const count = await Task.countDocuments()

        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            count,
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

        const task = await Task.find({ _id: id })

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task Not Found"
            })
        }

        const collaborators = await Collaboration.find({ task: id }).populate("collabuser").populate("user")

        res.status(200).json({
            message: "Task Details Fetched Successfully",
            task,
            collaborators
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
        const data = req.body;

        const updateTask = await Task.findByIdAndUpdate(
            id,
            { $set: data },
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