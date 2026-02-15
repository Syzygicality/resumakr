export const pingSchema = {
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
