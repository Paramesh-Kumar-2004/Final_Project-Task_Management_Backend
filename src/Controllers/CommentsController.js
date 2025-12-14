import Comments from "../Models/CommentsModel.js"



export const createComment = async (req, res) => {
    try {
        console.log("Entered Into Create Comments")

        const { task, comment } = req.body
        const user = req.user._id

        if (!task || !comment) {
            return res.status(400).json({
                success: false,
                message: "Task And Comments Are Required"
            })
        }

        const newComments = new Comments({ task, comment, user })
        await newComments.save()

        res.status(201).json({
            success: true,
            message: "Comments Added Successfully",
            comments: newComments
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}



export const getComments = async (req, res) => {
    try {
        console.log("Entered Into Get Comments")

        const { id } = req.params

        const comments = await Comments.find({ task: id }).populate("user")
        const count = await Comments.countDocuments({ task: id })

        res.status(200).json({
            success: true,
            message: "Comments Fetched Successfully",
            count,
            comments
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


export const deleteComment = async (req, res) => {
    try {
        console.log("Entered Into Delete Comment")
        const { id } = req.params
        await Comments.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Comment Deleted Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}