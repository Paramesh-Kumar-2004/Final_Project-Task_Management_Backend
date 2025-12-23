import express from "express"
import {
    ForgotPassword,
    GetUserDetails,
    getUsers,
    LoginUser,
    RegisterUser,
    ResetPassword,
} from "../Controllers/UserController.js"
import { Authentication, Authorization } from "../Middlewares/AuthMiddleware.js"



const router = express.Router()

router.post("/register", RegisterUser)
router.post("/login", LoginUser)
router.post("/forgetpassword", ForgotPassword)
router.put("/resetpassword/:id/:resetToken", ResetPassword)
router.get("/getuser", Authentication, Authorization("admin"), GetUserDetails)
router.get("/getusers", Authentication, getUsers)



export default router
