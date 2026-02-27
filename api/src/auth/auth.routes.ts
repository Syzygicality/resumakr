import { callbackController, loginController, logoutController } from '../controllers/auth.controllers';
import { tokenSchema } from './auth.schemas';

import { FastifyInstance } from 'fastify';

export default async function authRoutes(app: FastifyInstance) {
    app.get('/login', loginController);

    app.get('/callback', { schema: tokenSchema }, callbackController);

    app.get("/logout", logoutController);
}