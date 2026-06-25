import express from 'express'
import { register, updatePassword, updateProfile } from '../controllers/auth.controller.js'
import { login } from '../controllers/auth.controller.js'
import { profile } from '../controllers/auth.controller.js'
import { getPayloadFromToken } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post("/register", register)

router.post("/login", login)

router.get("/profile", getPayloadFromToken, profile)

router.patch("/update", getPayloadFromToken, updateProfile)

router.patch("/update-password", getPayloadFromToken, updatePassword)

export default router