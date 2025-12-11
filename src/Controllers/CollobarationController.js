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
            message: "Collobarator Added Successfully",
            collobaration
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};