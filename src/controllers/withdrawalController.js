const mongoose = require("mongoose");
const Withdrawal = require("../models/Withdrawal");
const Wallet = require("../models/Wallet");
const TransactionLog = require("../models/TransactionLog");
const { v4: uuidv4 } = require("uuid");
const withdrawalQueue = require("../queues/withdrawalQueue");
const Transaction = require("../models/Transaction");

exports.withdrawWalletBalance = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const user = req.user;
        const { amount, destination = "user-payment-destination", transactionId } = req.body;

        if (!user || !user._id) {
            throw new Error("Unauthorized user");
        }

        if (!amount || typeof amount !== "number" || amount <= 0) {
            throw new Error("Invalid withdrawal amount");
        }

        const existingTransaction = await Transaction.findOne({ user_id: user._id, transactionId: transactionId });
        if (existingTransaction) {
            return res.status(200).json({
                status: true,
                message: "Transaction already processed",
                data: existingTransaction
            });
        }

        const wallet = await Wallet.findOneAndUpdate(
            {
                user_id: user._id,
                balance: { $gte: amount }
            },
            {
                $inc: { balance: -amount }
            },
            {
                new: true,
                session
            }
        );

        if (!wallet) {
            throw new Error("Insufficient wallet balance");
        }
        const beforeBalance = wallet.balance + amount;
        const withdrawal = await Withdrawal.create(
            [{
                user_id: user._id,
                amount,
                destination,
                reference_id: uuidv4(),
                status: "processing"
            }],
            { session }
        );

        await TransactionLog.create(
            [{
                user_id: user._id,
                withdrawal_id: withdrawal[0]._id,
                type: "withdrawal",
                before_balance: beforeBalance,
                after_balance: wallet.balance,
                amount,
                status: "processing"
            }],
            { session }
        );

        await Transaction.create({
            user_id: user._id,
            transactionId,
            amount,
            type: "debit",
        });

        await withdrawalQueue.add("processWithdrawal", {
            withdrawalId: withdrawal[0]._id
        });
        await session.commitTransaction();
        return res.status(200).json({
            status: true,
            message: "Withdrawal request created successfully",
            data: withdrawal[0]
        });

    } catch (error) {
        await session.abortTransaction();
        console.error("Withdrawal error:", error);
        return res.status(400).json({
            status: false,
            message: error.message
        });

    } finally {
        session.endSession();
    }
};