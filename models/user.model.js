import mongoose from "mongoose";
import { createHash } from "../utils/encrypt.js";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\d{11}$/, 'Please enter a valid 11-digit phone number'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password has to be at least 8 characters long"]
    },
    role: {
        type: String,
        enum: ["admin", "landlord", "tenant"],
        default: "tenant",
        required: true
    },
    verificationStatus: {
        type: String,
        enum: ["verified", "unverified"],
        default: "unverified"
    },
    accountStatus: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
})

userSchema.pre('save', async function () {
   this.password = await createHash(this.password)
})

userSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();

  if (update.password) {
    update.password = await createHash(update.password
    );
  }
});

const User = mongoose.model('User', userSchema)

export default User
