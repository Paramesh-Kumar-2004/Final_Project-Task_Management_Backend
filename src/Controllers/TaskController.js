import Task from "../Models/TaskModel.js";
import User from "../Models/UserModel.js";
import APIFeatures from "../Utils/ApiFeatures.js";



export const createTask = async (req, res) => {
    try {

        const { title, description, category, priority, deadline, assignedTo } = req.body;

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

        // const tasks = await Task.find({
        //     $or: [
        //         { createdBy: req.user._id },
        //     ]
        // })
        //     .populate("createdBy", "name email")
        //     .populate("assignedTo", "name email")
        //     // .populate("sharedWith.user", "name email")
        //     .sort({ deadline: 1 });

        const pipeline = [
            {
                $match: {
                    createdBy: req.user._id
                }
            },
            {
                $addFields: {
                    statusOrder: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$status", "pending"] }, then: 1 },
                                { case: { $eq: ["$status", "in-progress"] }, then: 2 },
                                { case: { $eq: ["$status", "completed"] }, then: 3 }
                            ],
                            default: 4
                        }
                    },
                    priorityOrder: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$priority", "high"] }, then: 1 },
                                { case: { $eq: ["$priority", "medium"] }, then: 2 },
                                { case: { $eq: ["$priority", "low"] }, then: 3 }
                            ],
                            default: 4
                        }
                    }
                }
            },
            {
                $sort: {
                    statusOrder: 1,
                    deadline: 1,
                    priorityOrder: 1
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "createdBy"
                }
            },
            { $unwind: "$createdBy" },
            {
                $lookup: {
                    from: "users",
                    localField: "assignedTo",
                    foreignField: "_id",
                    as: "assignedTo"
                }
            },
            {
                $unwind: {
                    path: "$assignedTo",
                    preserveNullAndEmptyArrays: true
                }
            }
        ];

        const count = await Task.find({
            $or: [
                { createdBy: req.user._id },
            ]
        }).countDocuments();
        const features = new APIFeatures(pipeline, req.query)
            .search(["title", "description"])
            .filter()
            .paginate(count / 2);

        const tasks = await Task.aggregate(features.pipeline);

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

        const task = await Task.findById({ _id: id }).populate("createdBy").populate("sharedWith.user")

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
        const { taskid } = req.params
        const task = await Task.findById(taskid);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        const existingShare = await Task.findOne({
            _id: taskid,
            'sharedWith.user': userId
        });


        if (existingShare) {
            return res.status(400).json({
                success: false,
                message: "Task already shared with this user"
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

        res.status(200).json({
            success: true,
            message: "Shared Task Completed",
            task
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
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
            .populate("createdBy", "userName email")
            .populate("assignedTo", "userName email")
            .populate("sharedWith.user", "userName email")
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




// Report 

export const getDashboardReport = async (req, res) => {
    try {
        console.log("Entered Into Get Dashboard Report")

        const userId = req.user._id;

        const today = new Date();
        const next7Days = new Date();
        next7Days.setDate(today.getDate() + 7);

        const report = await Task.aggregate([
            {
                $match: {
                    $or: [
                        { createdBy: userId },
                        { assignedTo: userId },
                        { "sharedWith.user": userId }
                    ]
                }
            },
            {
                $group: {
                    _id: "$_id",
                    status: { $first: "$status" },
                    deadline: { $first: "$deadline" }
                }
            },
            {
                $facet: {
                    totalTasks: [
                        { $count: "count" }
                    ],
                    completedTasks: [
                        { $match: { status: "completed" } },
                        { $count: "count" }
                    ],
                    upcomingDeadlines: [
                        {
                            $match: {
                                deadline: { $gte: today, $lte: next7Days },
                                status: { $ne: "completed" }
                            }
                        },
                        { $count: "count" }
                    ]
                }
            }
        ]);

        const total = report[0].totalTasks[0]?.count || 0;
        const completed = report[0].completedTasks[0]?.count || 0;
        const upcoming = report[0].upcomingDeadlines[0]?.count || 0;

        const progress = total === 0
            ? 0
            : Math.round((completed / total) * 100);

        res.status(200).json({
            success: true,
            data: {
                totalTasks: total,
                completedTasks: completed,
                upcomingDeadlines: upcoming,
                progress
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};