"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const NotFoundError_1 = require("../errors/NotFoundError");
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    if (err instanceof NotFoundError_1.NotFoundError) {
        return res.status(err.statusCode).json({
            error: err.name,
            message: err.message
        });
    }
    res.status(500).json({ message: "Erro interno do servidor" });
}
