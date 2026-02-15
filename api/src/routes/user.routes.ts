import { mirrorController, userDeleteController } from '../controllers/user.controllers';

import { FastifyInstance } from 'fastify';

export default async function userRoutes(app: FastifyInstance) {
    app.addHook("preHandler", app.requireAuth());
    app.get("/me", mirrorController);
    app.delete("/me", userDeleteController);
}