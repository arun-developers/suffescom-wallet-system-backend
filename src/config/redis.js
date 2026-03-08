const { Redis } = require("ioredis");

const redisConnection = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null
});

module.exports = redisConnection;