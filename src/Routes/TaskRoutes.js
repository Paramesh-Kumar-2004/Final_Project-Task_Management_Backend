import express from "express"
import {
    createTask,
    deleteTask,
    getAllTasks,
    getSingleTask,
    updateTask,
} from "../Controllers/TaskController.js"
import { Authentication } from "../Middlewares/AuthMiddleware.js"

const router = express.Router()


router.get("/gettasks", Authentication, getAllTasks)
router.get("/getsingletask/:id", Authentication, getSingleTask)
router.post("/createtask", Authentication, createTask)
router.put("/updatetask/:id", Authentication, updateTask)
router.delete("/deletetask/:id", Authentication, deleteTask)


export default router