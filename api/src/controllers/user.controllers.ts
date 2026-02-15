import { getUser, deleteUser } from '../services/user.services';

import { FastifyRequest, FastifyReply } from 'fastify';

export async function mirrorController(request: FastifyRequest, reply: FastifyReply) {
    return await reply.send(getUser(request.server.mongo.db!, request.user.sub));
}

export async function userDeleteController(request: FastifyRequest, reply: FastifyReply) {
    return await reply.send(deleteUser(request.server.mongo.db!, request.user.sub));
}