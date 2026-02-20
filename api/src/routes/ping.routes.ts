import { FastifyInstance } from 'fastify';
import { pingController } from '../controllers/ping.controllers';
import { pingSchema } from '../schemas/ping.schemas';

export default async function pingRoutes(app: FastifyInstance) {
    app.get('/', { schema: pingSchema }, pingController);
}