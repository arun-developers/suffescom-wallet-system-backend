const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        default: "INR"
    }
}, {
    timestamps: { updatedAt: "updated_at", createdAt: false }
}, {
    versionKey: false
});

module.exports = mongoose.model("Wallets", WalletSchema);