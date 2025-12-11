import Collobaration from "../Models/CollobarationModel.js";



export const addCollobarator = async (req, res) => {
    try {
        console.log("Entered Into Add Collobarator")

        const { task, control, collobuser } = req.body;
        const user = req.user._id

        if (!task || !collobuser) {
            return res.status(400).json({
                success: false,
                message: "Task and collobuser are required"
            });
        }

        const existingCollobaration = await Collobaration.findOne({ task, collobuser });

        if (existingCollobaration) {
            return res.status(400).json({
                success: false,
                message: "Collobarator already exists"
            });
        }

        const newCollobaration = new Collobaration({ task, collobuser, control, user });
        const collobaration = new Collobaration(newCollobaration);
        await collobaration.save();

        res.status(201).json({
            success: true,
            message: "Collobarator Added Successfully",
            collobaration
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const getCollobarations = async (req, res) => {
    try {
        console.log("Entered Into Get All Collobarators")

        const collobarations = await Collobaration.find().populate("task").populate("collobuser").populate("user");
        const count = await Collobaration.countDocuments()

        res.status(200).json({
            success: true,
            message: "Collobarators Fetched Successfully",
            count,
            collobarations
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const deleteCollobaration = async (req, res) => {
    try {
        console.log("Entered Into Delete Collobaration")
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is required"
            })
        }

        await Collobaration.findByIdAndDelete(id)

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