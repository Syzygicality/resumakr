import { CallbackQuery, IdToken } from '../auth/auth.types';
import { checkNewUser } from '../services/auth.services';
import { loginUrl, getTokens, logoutUrl } from '../helpers/auth.client';

import { FastifyReply, FastifyRequest } from 'fastify';
import { jwtDecode } from "jwt-decode";


export async function loginController(request: FastifyRequest, reply: FastifyReply ) {
    return reply.redirect(loginUrl);
}

export async function callbackController(request: FastifyRequest<{ Querystring: CallbackQuery }>, reply: FastifyReply) {
    const { code } = request.query;

    if (!code) return reply.status(400).send({ error: 'Missing code' });

    const tokens = await getTokens(code);

    await checkNewUser(request.server.mongo.db!, jwtDecode<IdToken>(tokens.id_token));

    reply.code(200).send({accessToken: tokens.access_token, idToken: tokens.id_token});
}

export async function logoutController(request: FastifyRequest, reply: FastifyReply) {
    reply.redirect(logoutUrl);
}