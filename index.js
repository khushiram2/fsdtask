import express, { json } from "express"
import * as dotnv from "dotenv"
import { authRouter } from "./routes/authRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { dbConnection } from "./dbconnection/connection.js"
import { noteRouter } from "./routes/notesRoute.js"




dotnv.config()
const app=express()
await dbConnection()
const corsOptions = {
    origin: '*', //here we can define the origin. backedn will only process req from said origin
    credentials: true, //we used cookieparser so we need this to accept the cookies
  };


app.use(cors(corsOptions))
app.use(cookieParser())
app.use(json())
app.use("/auth",authRouter)
app.use("/note",noteRouter)

app.get("/",(_,res)=>res.send("workingfine"))


app.listen(process.env.PORT,()=>console.log("app started on port "+ process.env.PORT))