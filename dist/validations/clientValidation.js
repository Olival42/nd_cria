"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClientSchema = exports.createClientSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const cpfSchema = joi_1.default.string().custom((value, helpers) => {
    if (typeof value !== "string") {
        return helpers.error("any.invalid", { message: "CPF inválido." });
    }
    const cpf = value.replace(/\D/g, "");
    if (cpf.length !== 11) {
        return helpers.error("any.invalid", { message: "CPF deve ter 11 dígitos." });
    }
    if (/^(\d)\1{10}$/.test(cpf)) {
        return helpers.error("any.invalid", { message: "CPF inválido." });
    }
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += Number(cpf.charAt(i)) * (10 - i);
    }
    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10)
        firstDigit = 0;
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += Number(cpf.charAt(i)) * (11 - i);
    }
    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10)
        secondDigit = 0;
    if (firstDigit !== Number(cpf.charAt(9)) || secondDigit !== Number(cpf.charAt(10))) {
        return helpers.error("any.invalid", { message: "CPF inválido." });
    }
    return value;
}, "Validação de CPF");
exports.createClientSchema = joi_1.default.object({
    name: joi_1.default.string()
        .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
        .required()
        .messages({
        "string.empty": "Nome é obrigatório.",
        "string.pattern.base": "Nome deve conter apenas letras."
    }),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        "string.empty": "E-mail é obrigatório.",
        "string.email": "E-mail inválido."
    }),
    cpf: cpfSchema
        .required()
        .messages({
        "string.empty": "CPF é obrigatório."
    }),
    phone: joi_1.default.string()
        .pattern(/^\d{2}\d{4,5}\d{4}$/)
        .required()
        .messages({
        "string.empty": "Telefone é obrigatório.",
        "string.pattern.base": "Telefone inválido."
    })
});
exports.updateClientSchema = joi_1.default.object({
    name: joi_1.default.string()
        .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
        .messages({
        "string.pattern.base": "Nome deve conter apenas letras."
    }),
    email: joi_1.default.string()
        .email()
        .messages({
        "string.email": "E-mail inválido."
    }),
    cpf: cpfSchema,
    phone: joi_1.default.string()
        .pattern(/^\d{2}\d{4,5}\d{4}$/)
        .messages({
        "string.pattern.base": "Telefone inválido."
    })
});
