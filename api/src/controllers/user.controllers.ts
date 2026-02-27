import * as userService from '../services/user.services';
import { UserPatch } from '../types/user.types';

import { FastifyRequest, FastifyReply } from 'fastify';

export async function retrieveUser(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send(await userService.retrieveUser(request.server.mongo.db!, request.user.sub));
}

export async function retrieveUserAll(request: FastifyRequest, reply: FastifyReply) {
    return reply.send(await userService.retrieveUserAll(request.server.mongo.db!, request.user.sub));
}

export async function updateUser(request: FastifyRequest<{ Body: UserPatch }>, reply: FastifyReply) {
    return reply.code(200).send(await userService.updateUser(request.server.mongo.db!, request.user.sub, request.body));
}

export async function destroyUser(request: FastifyRequest, reply: FastifyReply) {
    await userService.destroyUserMongo(request.server.mongo.db!, request.user.sub);
    await userService.destroyUserAuth0(request.user.sub);
    return reply.send({ success: true });
}