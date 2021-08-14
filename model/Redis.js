const redis = require('redis');

// Connect to Redis
const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
    // password: process.env.REDIS_PASS
});

client.on('error', err => {
    console.log('Error ' + err);
});

module.exports = client;