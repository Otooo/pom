import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const redisURL = process.env.REDIS_URL || 'redis://localhost:6379';

const redis = createClient({
    url: redisURL,
});
console.log('Redis URL:', redisURL);

redis.on('error', (err) => console.error('Redis Client Error', err));
redis.on('connect', () => console.log('Redis Client Connected'));

(async () => {
    await redis.connect();
})();

export default redis;