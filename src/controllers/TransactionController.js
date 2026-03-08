const Transaction = require("../models/Transaction");

exports.getAllTransaction = async (req, res) => {
    try {
        const user = req.user;

        if (!user || !user._id) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized user"
            });
        }

        const transactions = await Transaction.find({ user_id: user._id }).sort({ createdAt: -1 });

        return res.status(200).json({
            status: true,
            message: "Transactions fetched successfully",
            data: transactions
        });

    } catch (error) {
        console.error("Error in getAllTransaction:", error);

        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message
        });
    }
};