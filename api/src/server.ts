import 'dotenv/config';
import Fastify from 'fastify';
import mongoPlugin from './plugins/mongo';
import authPlugin from './plugins/auth';
import pingRoutes from './routes/ping.routes';
import authRoutes from './routes/auth.routes';

const app = Fastify({ logger: true });

app.register(mongoPlugin);
app.register(authPlugin);

app.register(pingRoutes);
app.register(authRoutes);

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
