import express from "express"
import { Authentication } from "../Middlewares/AuthMiddleware"
import {
    createComment,
    getComments
} from "../Controllers/CommentsController"

const router = express.Router()



router.post("/createcomments", Authentication, createComment)
router.get("/getcomments", Authentication, getComments)



export default router