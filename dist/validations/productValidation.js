"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createProductSchema = joi_1.default.object({
    name: joi_1.default.string()
        .required()
        .messages({
        "string.empty": "O nome é obrigátorio."
    }),
    description: joi_1.default.string().allow(null, ''),
    price: joi_1.default.number()
        .min(1)
        .precision(2)
        .required()
        .messages({
        "number.base": "O preço deve ser um número.",
        "number.min": "O preço mínimo é 1.",
        "number.precision": "O preço pode ter no máximo 2 casas decimais.",
        "any.required": "O preço é obrigatório."
    }),
    quantity: joi_1.default.number()
        .integer()
        .min(1)
        .required()
        .messages({
        "number.integer": "A quantidade deve ser um inteiro.",
        "number.min": "A quantidade mínima é 1.",
        "any.required": "A quantidade é obrigatória."
    }),
    categoria: joi_1.default.string()
        .valid("ELETRONICO", "VESTUARIO", "MOVEIS", "LIVROS", "ALIMENTOS", "BELEZA")
        .required()
        .messages({
        "any.only": "Categoria deve ser apenas ELETRONICO, VESTUARIO, MOVEIS, LIVROS, ALIMENTOS, BELEZA",
        "any.required": "A categoria é obrigatória."
    })
});
exports.updateProductSchema = joi_1.default.object({
    name: joi_1.default.string()
        .alphanum()
        .messages({
        "string.alphanum": "O nome deve conter apenas letras e números."
    }),
    description: joi_1.default.string(),
    price: joi_1.default.number()
        .min(1)
        .precision(2)
        .messages({
        "number.base": "O preço deve ser um número.",
        "number.min": "O preço mínimo é 1.",
        "number.precision": "O preço pode ter no máximo 2 casas decimais."
    }),
    quantity: joi_1.default.number()
        .integer()
        .min(1)
        .messages({
        "number.integer": "A quantidade deve ser um inteiro.",
        "number.min": "A quantidade mínima é 1."
    }),
    categoria: joi_1.default.string()
        .valid("ELETRONICO", "VESTUARIO", "MOVEIS", "LIVROS", "ALIMENTOS", "BELEZA")
        .messages({
        "any.only": "Categoria deve ser apenas ELETRONICO, VESTUARIO, MOVEIS, LIVROS, ALIMENTOS, BELEZA"
    })
});
