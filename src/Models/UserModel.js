import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema = mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    passwordResetToken: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestap: true })



userSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 14);
})


const User = mongoose.model("User", userSchema)
export default User