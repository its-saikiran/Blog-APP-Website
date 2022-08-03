const { createClient } = require('redis');

const redis = new createClient({
    host: 'localhost',
    port: '6379'
})

redis.connect();
redis.on('connect', () => console.log('---> redis connected!'))
redis.on('error', (err) => console.log(`---> redis client error! ${err}`))

module.exports = redis;