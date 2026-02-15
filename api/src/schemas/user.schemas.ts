export const mirrorSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                preferredName: { type: 'string', optional: true },
                email: { type: 'string' },
                phoneNumber: { type: 'string', optional: true },
            }
        }
    }
}