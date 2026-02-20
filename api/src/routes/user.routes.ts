import { mirrorController, userDeleteController } from '../controllers/user.controllers';
import { mirrorSchema } from '../schemas/user.schemas';

import { FastifyInstance } from 'fastify';

export default async function userRoutes(app: FastifyInstance) {
    app.addHook("preHandler", app.requireAuth());
    app.get("", { schema: mirrorSchema}, mirrorController);
    app.delete("", userDeleteController);
}