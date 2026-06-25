import mongoose from "mongoose";

const savedPropertySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },
    dateSaved: {
        type: Date,
        default: Date.now
    }
})

const SavedProperty = mongoose.model('SavedProperty', savedPropertySchema)

export default SavedProperty