import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import AuthRoute from "./routes/AuthRoutes.js"
import MessageRoute from "./routes/MessageRoutes.js"
dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const PORT = process.env.PORT || 4000


app.use("/api/auth",AuthRoute)
app.use("/api/messages",MessageRoute)


app.listen(PORT,()=>console.log(`Server runing on port ${PORT}`))

global.onlineUsers = new Map()