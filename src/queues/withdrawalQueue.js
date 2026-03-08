const { Queue } = require("bullmq");
const redisConnection = require("../config/redis");

const withdrawalQueue = new Queue("withdrawalQueue", {
    connection: redisConnection
});
module.exports = withdrawalQueue;