const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    transactionId: {
        type: String,
        unique: true,
    },
    amount: Number,
    type: {
        type: String,
        enum: ["credit", "debit"],
    },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);