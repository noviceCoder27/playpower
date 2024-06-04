import swaggerJSDoc from "swagger-jsdoc";;

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'A simple Express API application documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
  };
  
  export const swaggerSpec = swaggerJSDoc(options);

