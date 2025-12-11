import express from "express"
import { Authentication } from "../Middlewares/AuthMiddleware.js"
import {
    addCollobarator,
    deleteCollobaration,
    getCollobarations
} from "../Controllers/CollobarationController.js";


const router = express.Router()


router.post("/addcollobaration", Authentication, addCollobarator)
router.get("/getcollobarations", Authentication, getCollobarations)
router.delete("/deletecollobaration/:id", Authentication, deleteCollobaration)


export default router;