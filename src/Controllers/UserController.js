import bcrypt from "bcrypt"
import User from "../Models/UserModel.js"
import { jwtSign, jwtVerify } from "../Utils/JWT.js";
import sendEmail from "../Utils/SendMail.js";



const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
};



export const RegisterUser = async (req, res, next) => {
    try {
        console.log("Entered Into Register User Controller")

        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({
                message: "All Fields Are Required"
            })
        }

        const emailExist = await User.findOne({ email })

        if (emailExist) {
            return res.status(400).json({
                message: "Email Already Exist"
            })
        }

        const user = await User.create({ userName, email, password })

        res.status(200).json({
            message: "User Register Successfully",
            userName,
            email,
        })

    } catch (error) {
        console.log("Error From Register Controller", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}



export const LoginUser = async (req, res) => {
    try {
        console.log("Entered Into Login ")

        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(404).json({
                message: "Email Not Found"
            })
        }

        const verifyPassword = await bcrypt.compare(`${password}`, `${user.password}`)

        if (!verifyPassword) {
            return res.status(404).json({
                message: "Password Invalid"
            })
        }

        const token = await jwtSign(user._id)

        if (verifyPassword) {
            res.status(200).json({
                message: "User Login Successfully",
                isAuth: true,
                token,
                user
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Intenal Server Error"
        })
    }
}


export const GetUserDetails = async (req, res) => {
    try {

        console.log("Entered Into Get User Details")
        const user = await User.find()
        const count = await User.countDocuments()

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        res.status(200).json({
            message: "User Details Fetched Successfully",
            totalUsers: count,
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Intenal Server Error"
        })
    }
}


export const ForgotPassword = async (req, res) => {
    try {

        console.log("Entered Into Forgot Password")

        const { email } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: `User Not Found For ${email}`
            })
        }

        const passwordRestToken = await jwtSign(user._id)

        user.passwordResetToken = passwordRestToken;
        await user.save()

        await sendEmail(
            user.email,
            "Password Reset Link",
            `${process.env.FRONTEND_URL}/PasswordReset/#/resetpassword/${user._id}/${passwordRestToken}`
        )

        res.status(200).json({
            message: "Forgot Mail Send To Your Email",
            passwordRestToken,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Intenal Server Error"
        })
    }
}


export const ResetPassword = async (req, res) => {
    try {
        console.log("Entered Into Reset Password")

        const { id, resetToken } = req.params;
        const { resetPassword } = req.body;

        if (!resetToken) {
            return res.status(404).json({ message: "Token Is Required" })
        }
        if (!resetPassword) {
            return res.status(404).json({ message: "resetPassword is Required" })
        }

        const decode = await jwtVerify(resetToken)
        if (!decode) {
            return res.status(404).json({ message: "Token Expired" })
        }

        const user = await User.findById(decode._id)
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }

        if (user.passwordResetToken !== resetToken) {
            return res.status(404).json({ message: "Token Invalid" })
        }

        user.password = resetPassword;
        user.passwordResetToken = undefined;
        await user.save();

        sendEmail(
            user.email,
            "Password Reset Successfully",
            `Your Password Has Been Reset Successfully`
        )

        res.status(200).json({
            message: "Password Reset Successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Intenal Server Error"
        })
    }
}


export const getUsers = async (req, res) => {
    try {
        console.log("Entered Into Get User For (Option)")
        const users = await User.find().select("_id email")

        res.status(200).json({
            success: true,
            message: "User Fetched Successfully",
            users
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Intenal Server Error"
        })
    }
}