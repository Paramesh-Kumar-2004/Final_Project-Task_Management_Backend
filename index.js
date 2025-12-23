import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import "./src/Utils/AutoMail.js"  // Scheduler For Sending Deadline Reminders
import { ConnectDB } from "./src/DbConfig/ConnectDB.js"
import AuthRoutes from "./src/Routes/UserRoutes.js"
import TaskRoutes from "./src/Routes/TaskRoutes.js"
import CommentsRoutes from "./src/Routes/CommentsRoutes.js"


const app = express()
dotenv.config()


// Middlewares
app.use("/public", express.static("public"))
app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// DB Connection
ConnectDB()

// APIs / Routes
app.use("/api/v1/auth", AuthRoutes)
app.use("/api/v1/task", TaskRoutes)
app.use("/api/v1/comment", CommentsRoutes)



app.get("/", (req, res) => {
    res.status(200).send("Task Manager Server Started...")
})


app.listen(process.env.PORT, () => {
    console.log(`Server Started At Port : ${process.env.PORT}`)
})
