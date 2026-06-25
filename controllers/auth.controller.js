import User from '../models/user.model.js';
import { compareHash } from "../utils/encrypt.js";
import jwt from 'jsonwebtoken'

export async function register(req, res) {
    try {
        const user = new User(req.body);
        await user.save();

        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        if (error.code && error.code === 11000) {
            return res.status(400).json({ message: "This email already exists" })
        }
        return res.status(500).json({ message: 'Error registering user', error: error.message });
    }


}

export async function login(req, res) {
    try {
        const currentUser = await User.findOne({ email: req.body.email });
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            const isMatch = await compareHash(req.body.password, currentUser.password)
            console.log(req.body.password)
            console.log(isMatch)
            if (isMatch) {
                const role = currentUser.role
                const id = currentUser._id

                const token = jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' })
                return res.status(200).json(token)
            } else {
                return res.status(401).json({ msg: 'Wrong password' })
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Error login in', error: error.message });
    }
}

export async function profile(req, res) {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select('-password') // Exclude the password field from the response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error getting profile' })
    }
}

export async function updateProfile(req, res) {
    try {
        const userId = req.user.id
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }).select('-password')
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ msg: 'Error updating profile' })
    }
}

export async function updatePassword(req, res) {  
    try {
        const userId = req.user.id
        const password = req.body.password
        if (!password) {
            return res.status(400).json({ msg: 'Password is required' })
        }
        const currentUser = await User.findByIdAndUpdate(userId, { password }, { new: true }).select('-password')
        res.status(200).json(currentUser)
    } catch (error) {
        res.status(500).json({ msg: 'Error updating password' })
    }
}
