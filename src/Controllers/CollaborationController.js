import Collaboration from "../Models/CollaborationModel.js";
import Task from "../Models/TaskModel.js"



export const addCollaborator = async (req, res) => {
    try {
        console.log("Entered Into Add Collobarator")

        const { task, control, collabuser } = req.body;
        const user = req.user._id

        if (!task || !collabuser) {
            return res.status(400).json({
                success: false,
                message: "Task and collabuser are required"
            });
        }

        const existsTask = await Task.findById(task)
        if (!existsTask) {
            return res.status(404).json({
                success: false,
                message: "Task Not Found"
            });
        }

        const existingCollaboration = await Collaboration.findOne({ task, collabuser });

        if (existingCollaboration) {
            return res.status(400).json({
                success: false,
                message: "Collobarator already exists"
            });
        }

        const newCollaboration = new Collaboration({ task, collabuser, control, user });
        await newCollaboration.save();

        res.status(201).json({
            success: true,
            message: "Collobarator Added Successfully",
            Collaboration
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const getCollaborations = async (req, res) => {
    try {
        console.log("Entered Into Get All Collobarators")

        const Collaborations = await Collaboration.find().populate("task").populate("collabuser").populate("user");
        const count = await Collaboration.countDocuments()

        res.status(200).json({
            success: true,
            message: "Collobarators Fetched Successfully",
            count,
            Collaborations
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const deleteCollaboration = async (req, res) => {
    try {
        console.log("Entered Into Delete Collaboration")
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is required"
            })
        }

        await Collaboration.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Collobarator Deleted Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


export const updateCollaboratorControl = async (req, res) => {
    try {
        console.log("Entered Into Update Colla")

        const { control } = req.body
        const { id } = req.params

        if (!control) {
            return res.status(400).json({
                success: false,
                message: "Control is required"
            })
        }

        const collaboration = await Collaboration.findById(id)

        if (!collaboration) {
            return res.status(404).json({
                success: false,
                message: "Collaboration Not Found"
            })
        }

        const updateCollaboratorControl = await Collaboration.findByIdAndUpdate(
            id,
            { control: control },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Collobarator Updated Successfully",
            updateCollaboratorControl
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}