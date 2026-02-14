export const tokenSchema = {
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