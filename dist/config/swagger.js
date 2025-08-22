"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
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
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
module.exports = { swaggerUi: swagger_ui_express_1.default, swaggerDocs };
