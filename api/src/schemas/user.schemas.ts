import { FastifySchema } from "fastify"

export const mirrorSchema: FastifySchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                preferredName: { type: 'string' },
                email: { type: 'string' },
                phoneNumber: { type: 'string' },
            },
            required: ['name', 'email']
        }
    }
}