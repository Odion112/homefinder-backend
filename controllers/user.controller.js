import User from '../models/user.model.js'
import { createHash } from '../utils/encrypt.js';

export async function getAllUsers(req, res, next) {
    try {
        const users = await User.find().select('-password') // Exclude the password field from the response
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ msg: 'Error getting all users' })
    }
}

export async function getSingleUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        console.log(user)
        if (!user) {
            res.status(404).json({ msg: "User not found" })
        } else {
            res.status(200).json(user)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error getting single user' })
    }
}

export async function createUser(req, res, next) {
    try {
        const newUser = new User(req.body)
        const hashedPassword = await createHash(req.body.password)
        newUser.password = hashedPassword
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
     if (error.code === 11000) {
        res.status(409).json({msg: "Duplicate username"})
     } 
        res.status(400).json({ msg: error.message })
    }
}

export async function updateUser(req, res, next) {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export async function deleteUser(req, res, next) {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: "user deleted successfully" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}