const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { STATUS } = require("../utils/constants")

const Users = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    transaction_pin: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 6
    },
    status: {
        type: String,
        enum: Object.values(STATUS),
        default: STATUS.ACTIVE
    }
}, {
    versionKey: false,
    timestamps: true
});

Users.pre("save", async function () {
    if (!this.isModified("transaction_pin")) return;
    const salt = await bcrypt.genSalt(10);
    this.transaction_pin = await bcrypt.hash(this.transaction_pin, salt);
});

module.exports = mongoose.model("Users", Users);