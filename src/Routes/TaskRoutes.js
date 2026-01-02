import express from "express"
import {
    createTask,
    deleteTask,
    getAllTasks,
    getDashboardReport,
    getSharedTasks,
    getSingleTask,
    shareTask,
    updateTask,
    removeSharedUser,
} from "../Controllers/TaskController.js"
import { Authentication } from "../Middlewares/AuthMiddleware.js"
import upload from "../Middlewares/MulterMiddleware.js"

const router = express.Router()


router.get("/gettasks", Authentication, getAllTasks)
router.get("/getsharedtasks", Authentication, getSharedTasks)
router.get("/getsingletask/:id", Authentication, getSingleTask)
router.post("/createtask", Authentication, upload.single("file"), createTask)
router.put("/updatetask/:id", Authentication, updateTask)
router.delete("/deletetask/:id", Authentication, deleteTask)
router.put("/sharetask/:taskid", Authentication, shareTask)
router.get("/dashboard/getreport", Authentication, getDashboardReport)
router.delete("/removeshareduser/:taskId/:userId", Authentication, removeSharedUser)


export default router