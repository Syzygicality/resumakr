import * as keyService from "./key.services";

import { FastifyRequest, FastifyReply } from "fastify";

export async function retrieveKeyStatus(request: FastifyRequest, reply: FastifyReply) {
    return reply.send(await keyService.retrieveKeyStatus(request.server.mongo.db!, request.user.sub));
}

export async function createKey(request: FastifyRequest, reply: FastifyReply) {
    return reply.send(await keyService.createKey(request.server.mongo.db!, request.user.sub));
}