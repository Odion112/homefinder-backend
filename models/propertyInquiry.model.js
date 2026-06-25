import mongoose from "mongoose";

const propertyInquirySchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },
    propertySeekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    landlordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "responded"],
        default: "pending",
        required: true
    }
}, {
    timestamps: true
})

const PropertyInquiry = mongoose.model('PropertyInquiry', propertyInquirySchema)

export default PropertyInquiry