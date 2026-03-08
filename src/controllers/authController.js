const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Users = require("../models/User");

exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        };
        if (!token) {
            return res.status(404).json({
                status: false,
                message: "You are not logged in. Please log in first to get access!"
            });
        }

        const decodeToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const signedUser = await Users.findById(decodeToken.id);
        if (!signedUser) {
            return res.status(401).json({
                status: false,
                message: 'The token belonging to the user, does no longer exists'
            })
        }
        req.user = signedUser;
        next();
    } catch (error) {
        console.error("Error in authorization:", error);
        return res.status(401).json({
            status: false,
            message: "Unauthorized access!",
            error: error.message
        });
    }
};
