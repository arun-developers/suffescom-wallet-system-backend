const bcrypt = require('bcrypt');
const Users = require("../models/User");
const SignToken = require("../utils/signToken");

exports.createUser = async (req, res) => {
    const { name, email, transaction_pin } = req.body;

    try {
        let user = await Users.findOne({ email });
        let isNew = false;

        if (!user) {
            user = await Users.create({ name, email, transaction_pin });
            isNew = true;
        }

        const token = SignToken(user._id);

        const userData = user.toObject();
        userData.token = token;

        return res.status(isNew ? 201 : 200).json({
            status: true,
            message: isNew ? "User created successfully!" : "User already exists!",
            data: userData
        });

    } catch (error) {
        console.error("Error in createUser:", error);

        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message
        });
    }
};