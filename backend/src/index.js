import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import {connectDB} from "./lib/db.js"
import cookieparser from "cookie-parser"
import cors from "cors";
// import path from "path";
import {app,server} from "./lib/socket.js";



dotenv.config();


const PORT = process.env.PORT;
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)


server.listen(PORT,()=>{
    console.log("the server is running on port:"+PORT);
    connectDB();
}) 