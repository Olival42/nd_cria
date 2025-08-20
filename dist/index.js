"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientController_1 = __importDefault(require("./controller/clientController"));
const productController_1 = __importDefault(require("./controller/productController"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use("/clients", clientController_1.default);
app.use("/products", productController_1.default);
app.listen(port, () => {
    console.log(`Servidor rodando.`);
});
