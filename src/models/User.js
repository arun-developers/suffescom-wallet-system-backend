const mongoose = require("mongoose");
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
    status: {
        type: String,
        enum: Object.values(STATUS),
        default: STATUS.ACTIVE
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Users", Users);