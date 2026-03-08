const mongoose = require("mongoose");

const WithdrawalSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "processing", "success", "failed"],
        default: "pending"
    },
    reference_id: {
        type: String,
        unique: true
    }
}, {
    timestamps: { createdAt: "created_at", updatedAt: false }
}, {
    versionKey: false
});

module.exports = mongoose.model("Withdrawals", WithdrawalSchema);