const PORT = process.env.PORT;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Daily activities API',
      version: '1.0.0',
      description:
        'This is an API application made with Express and documented with Swagger'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      }
    ]
  },
  apis: ['./routes/*.js']
};

module.exports = swaggerOptions;