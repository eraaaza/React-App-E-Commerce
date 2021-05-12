const mongoose = require("mongoose");
const randomstring = require("randomstring");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    purchased: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        default: `${randomstring.generate(16)}`
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    inquiries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Inquiry"
        }
    ]
});

module.exports = mongoose.model("Listing", listingSchema);
