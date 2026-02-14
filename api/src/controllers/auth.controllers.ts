import { CallbackQuery, IdToken } from '../types/auth.types';

import { FastifyReply, FastifyRequest } from 'fastify';
import { jwtDecode } from "jwt-decode";
import { checkNewUser, getTokens } from '../services/auth.services';

export async function loginController(request: FastifyRequest, reply: FastifyReply ) {
    const params = new URLSearchParams({
        client_id: process.env.AUTH0_CLIENT_ID!,
        response_type: 'code',
        scope: 'openid profile email',
        redirect_uri: process.env.AUTH0_CALLBACK_URL!,
        audience: process.env.AUTH0_AUDIENCE!,
    }); 
    return reply.redirect(`https://${process.env.AUTH0_DOMAIN}/authorize?${params.toString()}`);
}

export async function callbackController(request: FastifyRequest<{ Querystring: CallbackQuery }>, reply: FastifyReply) {
    const { code } = request.query;

    if (!code) return reply.status(400).send({ error: 'Missing code' });

    const tokens = await getTokens(code);

    await checkNewUser(request.server.mongo.db!, jwtDecode<IdToken>(tokens.id_token));

    console.log(tokens.access_token);
    console.log(tokens.id_token);

    reply.code(200).send({
        accessToken: tokens.access_token,
        idToken: tokens.id_token,
    });
}

export async function logoutController(request: FastifyRequest, reply: FastifyReply) {
    const returnTo = encodeURIComponent(process.env.APP_BASE_URL || "http://localhost:3000/login");

    const logoutUrl = `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${returnTo}`;

    reply.redirect(logoutUrl);
}