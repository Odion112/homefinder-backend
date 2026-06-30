import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './utils/db.js'
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import { getPayloadFromToken, onlyAllowAdmin } from './middlewares/auth.middleware.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/users", getPayloadFromToken, onlyAllowAdmin, userRoutes)

app.get("/" , (req,res) =>{
    res.send ("Entry point of the backend server")
})

connectToDatabase()

app.listen(8080, ()=>{console.log("Server is running on port 8080")})