import { FastifySchema } from "fastify"

export const pingSchema: FastifySchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                foo: { type: 'string', optional: true }
            }
        }
    }
};
