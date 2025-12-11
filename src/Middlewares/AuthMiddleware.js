import User from "../Models/UserModel.js";
import { jwtVerify } from "../Utils/JWT.js";


export const Authentication = async (req, res, next) => {
    try {

        const { token } = req.cookies;
        const decode = await jwtVerify(token);

        if (!token) {
            return res.status(404).json({
                message: "Token Is Not Available"
            })
        }

        if (!decode) {
            return res.status(401).json({
                message: "Unauthorized User : Login And Try Again"
            });
        }

        const user = await User.findById(decode._id);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        req.user = user
        next()

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Intenal Server Error"
        })
    }
}


export const Authorization = (roles) => {
    return (req, res, next) => {
        try {

            const user = req.user;
            if (!roles.includes(user.role)) {
                return res.status(403).json({
                    message: "Forbidden : You Don't Have Permission To Access This Resource"
                });
            }
            next();

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Intenal Server Error"
            })
        }
    }
}