"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(message = "Recurso não encontrado") {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}
exports.NotFoundError = NotFoundError;
