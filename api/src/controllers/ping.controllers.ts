import { FastifyRequest, FastifyReply } from 'fastify';
import { BaseUser } from '../types/auth.types';

export async function ping(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.code(200).send({ message: 'PONG' });
}

export async function pingAuth(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = await request.server.mongo.db?.collection<BaseUser>("users").findOne({_id: request.user.sub});
  return reply.send({message: 'PONG (protected)', me: user});
}