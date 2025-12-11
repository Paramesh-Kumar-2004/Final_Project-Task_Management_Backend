import express from "express"
import { Authentication } from "../Middlewares/AuthMiddleware.js"
import {
    addCollobarator,
    deleteCollaboration,
    getCollaborations
} from "../Controllers/CollaborationController.js";


const router = express.Router()


router.post("/addcollaboration", Authentication, addCollobarator)
router.get("/getcollaborations", Authentication, getCollaborations)
router.delete("/deletecollaboration/:id", Authentication, deleteCollaboration)


export default router;