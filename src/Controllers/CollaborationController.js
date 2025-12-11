import Collaboration from "../Models/CollaborationModel.js";



export const addCollaborator = async (req, res) => {
    try {
        console.log("Entered Into Add Collobarator")

        const { task, control, collabuser } = req.body;
        const user = req.user._id

        if (!task || !collabuser) {
            return res.status(400).json({
                success: false,
                message: "Task and collobuser are required"
            });
        }

        const existingCollaboration = await Collaboration.findOne({ task, collobuser });

        if (existingCollaboration) {
            return res.status(400).json({
                success: false,
                message: "Collobarator already exists"
            });
        }

        const newCollaboration = new Collaboration({ task, collobuser, control, user });
        const Collaboration = new Collaboration(newCollaboration);
        await Collaboration.save();

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

        const Collaborations = await Collaboration.find().populate("task").populate("collobuser").populate("user");
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

        const updateCollaboratorControl = await Collaboration.findByIdAndUpdate(
            id,
            control,
            { new: true }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}