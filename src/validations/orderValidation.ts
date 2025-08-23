import Joi from "joi";

export const createOrderSchema = Joi.object({
    clientId: Joi.number()
        .integer()
        .required()
        .messages({
            "number.integer": "O ID do cliente deve ser um inteiro.",
            "any.required": "O ID do cliente é obrigatório."
        }),

    products: Joi.array()
        .items(
            Joi.object({
                productId: Joi.number().integer().required(),
                quantity: Joi.number().integer().min(1).required(),
            })
        )
        .min(1)
        .required()
        .messages({
            "number.min": "Deve conter pelo um pedido."
        }),

    total: Joi.number().min(0)
});