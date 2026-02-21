import { mirrorController, mirrorAllController, userPatchController, userDeleteController } from '../controllers/user.controllers';
import { mirrorSchema } from '../schemas/user.schemas';

import { FastifyInstance } from 'fastify';

export default async function userRoutes(app: FastifyInstance) {
    app.addHook("preHandler", app.requireAuth());
    app.get("", { schema: mirrorSchema }, mirrorController);
    app.get("/all", mirrorAllController);
    app.patch("", { schema: mirrorSchema }, userPatchController);
    app.delete("", userDeleteController);
}