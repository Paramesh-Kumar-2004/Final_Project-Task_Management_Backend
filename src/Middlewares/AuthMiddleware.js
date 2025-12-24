import User from "../Models/UserModel.js";
import { jwtVerify } from "../Utils/JWT.js";


export const Authentication = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authorized, token missing, Login Again"
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = await jwtVerify(token);

        const user = await User.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User no longer exists"
            });
        }

        req.user = user
        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: "Not authorized, token invalid , Login And Try Again"
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