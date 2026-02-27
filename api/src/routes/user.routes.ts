import * as userController from '../controllers/user.controllers';
import { mirrorSchema } from '../schemas/user.schemas';

import { FastifyInstance } from 'fastify';

export default async function userRoutes(app: FastifyInstance) {
    app.addHook("preHandler", app.requireAuth());
    app.get("", { schema: mirrorSchema }, userController.retrieveUser);
    app.get("/all", userController.retrieveUserAll);
    app.patch("", { schema: mirrorSchema }, userController.updateUser);
    app.delete("", userController.destroyUser);
}