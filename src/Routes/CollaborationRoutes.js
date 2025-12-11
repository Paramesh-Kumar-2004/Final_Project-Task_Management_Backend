import express from "express"
import { Authentication } from "../Middlewares/AuthMiddleware.js"
import {
    addCollaborator,
    deleteCollaboration,
    getCollaborations,
    updateCollaboratorControl
} from "../Controllers/CollaborationController.js";


const router = express.Router()


router.post("/addcollaboration", Authentication, addCollaborator)
router.get("/getcollaborations", Authentication, getCollaborations)
router.delete("/deletecollaboration/:id", Authentication, deleteCollaboration)
router.patch("/updatecollaborationcontrol/:id", Authentication, updateCollaboratorControl)


export default router;