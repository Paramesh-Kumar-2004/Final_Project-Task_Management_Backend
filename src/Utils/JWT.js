import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()



export async function jwtSign(_id) {
    try {
        return jwt.sign(
            { _id },
            process.env.Secret_Key,
            { expiresIn: process.env.Expires_In }
        )
    } catch (error) {
        // console.log("JWT Sign Error :", error)
        return null
    }
}


export async function jwtVerify(token) {
    try {
        const decode = jwt.verify(token, process.env.Secret_Key)
        return decode
    } catch (error) {
        // console.log("JWT Verify Error :", error)
        return null
    }
}
