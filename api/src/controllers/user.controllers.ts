import { getUserEntry, deleteUserEntry, deleteUserAuth0 } from '../services/user.services';

import { FastifyRequest, FastifyReply } from 'fastify';

export async function mirrorController(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send(await getUserEntry(request.server.mongo.db!, request.user.sub));
}

export async function userDeleteController(request: FastifyRequest, reply: FastifyReply) {
    await deleteUserEntry(request.server.mongo.db!, request.user.sub);
    await deleteUserAuth0(request.user.sub);
    return reply.send({ success: true });
}