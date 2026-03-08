const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");

exports.AddWalletBalance = async (req, res) => {
    try {
        const user = req.user;
        const { balance, transactionId } = req.body;

        if (!user || !user._id) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized user"
            });
        }

        if (!balance || typeof balance !== "number" || balance <= 0) {
            return res.status(400).json({
                status: false,
                message: "Invalid balance amount"
            });
        }

        const existingTransaction = await Transaction.findOne({ user_id: user._id, transactionId: transactionId });

        if (existingTransaction) {
            return res.status(200).json({
                status: true,
                message: "Transaction already processed",
            });
        }

        const wallet = await Wallet.findOneAndUpdate(
            { user_id: user._id },
            { $inc: { balance: balance } },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        );

        await Transaction.create({
            user_id: user._id,
            transactionId,
            amount: balance,
            type: "credit",
        });

        return res.status(200).json({
            status: true,
            message: "Wallet balance updated successfully",
            data: wallet
        });

    } catch (error) {
        console.error("Error in AddWalletBalance:", error);

        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

exports.getWalletBalance = async (req, res) => {
    try {
        const user = req.user;

        if (!user || !user._id) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized user"
            });
        }

        const wallet = await Wallet.findOne({ user_id: user._id });

        return res.status(200).json({
            status: true,
            message: "Wallet balance fetched successfully",
            data: {
                balance: wallet ? wallet.balance : 0
            }
        });

    } catch (error) {
        console.error("Error in getWalletBalance:", error);

        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message
        });
    }
};