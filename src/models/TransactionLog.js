const mongoose = require("mongoose");

const TransactionLogSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    withdrawal_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Withdrawals"
    },
    type: {
        type: String,
        enum: ["withdrawal"],
        default: "withdrawal"
    },
    before_balance: {
        type: Number,
        required: true
    },
    after_balance: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "processing", "success", "failed"],
        default: "pending"
    }
}, {
    timestamps: { createdAt: "created_at", updatedAt: false }
}, {
    versionKey: false
});

module.exports = mongoose.model("TransactionLogs", TransactionLogSchema);