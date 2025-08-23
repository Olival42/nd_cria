import Joi from "joi";

export const createProductSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "string.empty": "O nome é obrigátorio."
        }),

    description: Joi.string().allow(null, ''),

    price: Joi.number()
        .min(1)
        .precision(2)
        .required()
        .messages({
            "number.base": "O preço deve ser um número.",
            "number.min": "O preço mínimo é 1.",
            "number.precision": "O preço pode ter no máximo 2 casas decimais.",
            "any.required": "O preço é obrigatório."
        }),

    quantity: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.integer": "A quantidade deve ser um inteiro.",
            "number.min": "A quantidade mínima é 1.",
            "any.required": "A quantidade é obrigatória."
        }),

    categoria: Joi.string()
        .valid("ELETRONICO", "VESTUARIO", "MOVEIS", "LIVROS", "ALIMENTOS", "BELEZA")
        .required()
        .messages({
            "any.only": "Categoria deve ser apenas ELETRONICO, VESTUARIO, MOVEIS, LIVROS, ALIMENTOS, BELEZA",
            "any.required": "A categoria é obrigatória."
        })
});

export const updateProductSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .messages({
            "string.alphanum": "O nome deve conter apenas letras e números."
        }),

    description: Joi.string(),

    price: Joi.number()
        .min(1)
        .precision(2)
        .messages({
            "number.base": "O preço deve ser um número.",
            "number.min": "O preço mínimo é 1.",
            "number.precision": "O preço pode ter no máximo 2 casas decimais."
        }),

    quantity: Joi.number()
        .integer()
        .min(1)
        .messages({
            "number.integer": "A quantidade deve ser um inteiro.",
            "number.min": "A quantidade mínima é 1."
        }),
        
    categoria: Joi.string()
        .valid("ELETRONICO", "VESTUARIO", "MOVEIS", "LIVROS", "ALIMENTOS", "BELEZA")
        .messages({
            "any.only": "Categoria deve ser apenas ELETRONICO, VESTUARIO, MOVEIS, LIVROS, ALIMENTOS, BELEZA"
        })
});