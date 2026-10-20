import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './utils/db.js'
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import propertyRoutes from "./routes/property.route.js"
import propertyInquiryRoutes from "./routes/propertyInquiry.route.js"
import { getPayloadFromToken, onlyAllowAdmin } from './middlewares/auth.middleware.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/users", getPayloadFromToken, onlyAllowAdmin, userRoutes)
app.use("/properties", propertyRoutes)
app.use("/inquiries", getPayloadFromToken, propertyInquiryRoutes)

app.get("/" , (req,res) =>{
    res.send ("Entry point of the backend server")
})

connectToDatabase()

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`)})
