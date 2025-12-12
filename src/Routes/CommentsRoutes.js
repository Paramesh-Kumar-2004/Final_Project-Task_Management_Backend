import express from "express"
import { Authentication } from "../Middlewares/AuthMiddleware.js"
import {
    createComment,
    getComments
} from "../Controllers/CommentsController.js"


const router = express.Router()



router.post("/createcomments", Authentication, createComment)
router.get("/getcomments", Authentication, getComments)



export default router