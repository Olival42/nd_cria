import { Router } from "express";
import * as orderController from "../controllers/orderController";
import { validate } from "../middlewares/validate";
import { createOrderSchema } from "../validations/orderValidation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Rotas de pedidos
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - products
 *             properties:
 *               clientId:
 *                 type: integer
 *                 example: 1
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 10
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123
 *                 clientId:
 *                   type: integer
 *                   example: 1
 *                 total:
 *                   type: number
 *                   example: 150.50
 *                 pedidos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: integer
 *                         example: 10
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *                       subTotal:
 *                         type: number
 *                         example: 100.00
 *       400:
 *         description: Erro de validação
 */
router.post("/", validate(createOrderSchema), orderController.createOrder);

export default router;