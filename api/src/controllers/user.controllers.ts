import { getPartialUserEntry, getFullUserEntry, updateUserEntry, deleteUserEntry, deleteUserAuth0 } from '../services/user.services';
import { UserPatch } from '../types/user.types';

import { FastifyRequest, FastifyReply } from 'fastify';

export async function mirrorController(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send(await getPartialUserEntry(request.server.mongo.db!, request.user.sub));
}

export async function mirrorAllController(request: FastifyRequest, reply: FastifyReply) {
    return reply.send(await getFullUserEntry(request.server.mongo.db!, request.user.sub));
}

export async function userPatchController(request: FastifyRequest<{ Body: UserPatch }>, reply: FastifyReply) {
    return reply.code(200).send(await updateUserEntry(request.server.mongo.db!, request.user.sub, request.body));
}

export async function userDeleteController(request: FastifyRequest, reply: FastifyReply) {
    await deleteUserEntry(request.server.mongo.db!, request.user.sub);
    await deleteUserAuth0(request.user.sub);
    return reply.send({ success: true });
}