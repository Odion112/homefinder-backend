import express from 'express'
import { connectToDatabase } from './utils/db.js'
import authRoutes from "./routes/auth.route.js"


const app = express()

app.use(express.json)

app.use("/auth", )

app.get("/" , (req,res) =>{
    res.send ("Entry point of the backend server")
})

app.listen(8080, ()=>{console.log("Server is running on port 8080")})