import { FastifySchema } from "fastify"

export const tokenSchema: FastifySchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                accessToken: { type: 'string' },
                idToken: { type: 'string' }
            }
        }
    }
}