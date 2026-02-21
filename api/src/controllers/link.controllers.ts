

import { FastifyRequest, FastifyReply } from "fastify";

export async function linkListController(request: FastifyRequest, reply: FastifyReply) {
    // return reply.code(200).send(await getLinksAll(request.server.mongo.db!, request.user.sub));
}

export async function linkRetrieveController(request: FastifyRequest, reply: FastifyReply) {
    // return reply.code(200).send(await getLinkById(request.server.mongo.db!, request.user.sub, request.params))
}

export async function linkUpdateController(request: FastifyRequest, reply: FastifyReply) {
    return
}

export async function linkDestroyController(request: FastifyRequest, reply: FastifyReply) {
    return
}