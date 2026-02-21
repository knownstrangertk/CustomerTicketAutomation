import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'SchoolConnect API', version: '1.0.0' },
    servers: [{ url: '/api/v1' }]
  },
  apis: []
});
