import express from "express"
import { Authentication } from "../Middlewares/AuthMiddleware.js"
import {
    addCollobarator
} from "../Controllers/CollobarationController.js";


const router = express.Router()


router.post("/addcollobaration", Authentication, addCollobarator)


export default router;