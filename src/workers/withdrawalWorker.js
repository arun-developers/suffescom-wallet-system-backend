const { Worker } = require("bullmq");
const redisConnection = require("../config/redis");
const Withdrawal = require("../models/Withdrawal");
const Wallet = require("../models/Wallet");
const TransactionLog = require("../models/TransactionLog");

const worker = new Worker("withdrawalQueue", async (job) => {
        const { withdrawalId } = job.data;
    const withdrawal = await Withdrawal.findById(withdrawalId);
    if (!withdrawal) return;
    await Withdrawal.findByIdAndUpdate(withdrawalId, {
        status: "processing"
    });

    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await Withdrawal.findByIdAndUpdate(withdrawalId, {
            status: "success"
        });
        await TransactionLog.updateOne(
            { withdrawal_id: withdrawalId },
            { status: "success" }
        );

    } catch (error) {
        await Withdrawal.findByIdAndUpdate(withdrawalId, {
            status: "failed"
        });

        await TransactionLog.updateOne(
            { withdrawal_id: withdrawalId },
            { status: "failed" }
        );
    }
},
    { connection: redisConnection }
);

worker.on("completed", (job) => {
    console.log("Job completed:", job.id);
});

worker.on("failed", (job, err) => {
    console.log("Job failed:", err.message);
});

module.exports = worker;