import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Configurações do Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0", // versão do OpenAPI
        info: {
            title: "API Exemplo com Swagger",
            version: "1.0.0",
            description: "Documentação da API com Swagger",
        },
        servers: [
            {
                url: "http://localhost:3000", // URL base da sua API
            },
        ],
    },
    apis: ["./src/controller/*.ts"], // Caminho para os arquivos com suas rotas e comentários
};

// Gerar especificação
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };