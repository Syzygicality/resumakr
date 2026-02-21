import { FastifySchema } from "fastify"

export const mirrorSchema: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            preferredName: { type: 'string' },
            email: { type: 'string' },
            phoneNumber: { type: 'string' },
        },
        additionalProperties: false
    },
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