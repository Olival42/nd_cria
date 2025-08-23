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
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Notebook Dell Inspiron"
 *         description:
 *           type: string
 *           example: "Notebook com 16GB RAM e SSD 512GB"
 *         price:
 *           type: number
 *           format: float
 *           example: 3999.90
 *         quantity:
 *           type: integer
 *           example: 50
 *     OrderProduct:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 *         productId:
 *           type: integer
 *           example: 1
 *         quantity:
 *           type: integer
 *           example: 2
 *         subTotal:
 *           type: number
 *           format: float
 *           example: 7999.80
 *         product:
 *           $ref: '#/components/schemas/Product'
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 5
 *         clientId:
 *           type: integer
 *           example: 3
 *         total:
 *           type: number
 *           format: float
 *           example: 12000.50
 *         pedidos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderProduct'
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
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
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno
 */
router.post("/", validate(createOrderSchema), orderController.createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Lista todos os pedidos ou filtra por clientId
 *     tags: [Pedidos]
 *     parameters:
 *       - in: query
 *         name: clientId
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID do cliente para filtrar pedidos (opcional)
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", orderController.getOrders); // Função ajustada para aceitar clientId opcional


/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Retorna um pedido pelo ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/:id", orderController.getOrderById);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Exclui um pedido pelo ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido a ser excluído
 *     responses:
 *       200:
 *         description: Pedido excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pedido excluído com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/:id", orderController.deleteById);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Atualiza os produtos de um pedido pelo ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *             properties:
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
 *       200:
 *         description: Pedido atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 clientId:
 *                   type: integer
 *                   example: 1
 *                 total:
 *                   type: number
 *                   example: 150.5
 *                 pedidos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/:id", orderController.updateById);


export default router;