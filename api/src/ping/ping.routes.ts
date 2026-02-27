import { FastifyInstance } from 'fastify';
import { pingController } from './ping.controllers';
import { pingSchema } from './ping.schemas';

export default async function pingRoutes(app: FastifyInstance) {
    app.get('/', { schema: pingSchema }, pingController);
}