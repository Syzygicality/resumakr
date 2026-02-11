import { FastifyRequest, FastifyReply } from 'fastify';

export async function ping(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.code(200).send({ message: 'PONG' });
}