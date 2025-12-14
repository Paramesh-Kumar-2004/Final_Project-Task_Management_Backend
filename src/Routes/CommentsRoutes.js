import express from "express"
import { Authentication } from "../Middlewares/AuthMiddleware.js"
import {
    createComment,
    deleteComment,
    getComments
} from "../Controllers/CommentsController.js"


const router = express.Router()



router.post("/createcomments", Authentication, createComment)
router.get("/getcomments/:id", Authentication, getComments)
router.delete("/deletecomment/:id", Authentication, deleteComment)



export default router