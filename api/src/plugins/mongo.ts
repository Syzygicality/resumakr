import fp from 'fastify-plugin';
import fastifyMongo from '@fastify/mongodb';

const mongoPlugin = fp(async (app) => {
    if (!process.env.MONGO_URL) {
        throw new Error('MONGO_URL environment variable not defined');
    }
    await app.register(fastifyMongo, {
        url: process.env.MONGO_URL,
    });
});

export default mongoPlugin;
