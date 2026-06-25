import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    propertyType: {
        type: String,
        enum: ["apartment", "self-contained", "duplex", "bungalow", "room&parlour", "office space"],
        required: true,
        default: "apartment"
    },
    landlordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    availabilityStatus: {
        type: String,
        enum: ["available", "rented"],
        default: "available",
        required: true
    }   
}, {
    timestamps: true
})


const Property = mongoose.model('Property', propertySchema)

export default Property