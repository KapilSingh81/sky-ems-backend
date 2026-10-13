import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SkyEMS API",
      version: "1.0.0",
      description: "API documentation for SkyEMS application",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);