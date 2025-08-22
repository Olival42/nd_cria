import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Produtos",
            version: "1.0.0",
            description: "Documentação da API de produtos",
        },
        servers: [
            { url: "http://localhost:3000" }
        ],
    },
    apis: ["./src/routes/*.ts"], // aqui você aponta para onde estão suas rotas
});