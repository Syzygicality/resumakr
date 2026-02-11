import 'dotenv/config';
import Fastify from 'fastify';
import mongoPlugin from './plugins/mongo';
import pingRoutes from './routes/ping.route';

const app = Fastify({ logger: true });

app.register(mongoPlugin);
app.register(pingRoutes);

const start = async () => {
    try {
        await app.listen({ port: 3000 });
        app.log.info('Server running on http://localhost:3000');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
