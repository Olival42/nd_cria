"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/clients", clientRoutes_1.default);
app.use("/products", productRoutes_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
