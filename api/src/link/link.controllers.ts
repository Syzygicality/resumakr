import { PathId } from "../utils/types";
import { LinkCreate, LinkUpdate } from "./link.types";

import { FastifyRequest, FastifyReply } from "fastify";

export async function listLinks(request: FastifyRequest, reply: FastifyReply) {
    return
}

export async function createContactLink(request: FastifyRequest<{ Body: LinkCreate }>, reply: FastifyReply) {
    return
}

export async function retrieveLink(request: FastifyRequest<{ Params: PathId }>, reply: FastifyReply) {
    return
}

export async function updateLink(request: FastifyRequest<{ Params: PathId, Body: LinkUpdate }>, reply: FastifyReply) {
    return
}

export async function destroyContactLink(request: FastifyRequest<{ Params: PathId }>, reply: FastifyReply) {
    return
}