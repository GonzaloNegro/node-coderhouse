export const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API NoticiasCoderHouse API',
            version: '1.0.0',
            description: 'Proyecto final, desarrollo backend CoderHouse. Ecommerce.'
        },
        servers: [
            {
                url: 'http://localhost:8080/api'
            }
        ]
    },
    apis: ['./src/docs/paths.yml']
}