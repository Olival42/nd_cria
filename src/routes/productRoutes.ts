import { Router } from "express";
import { validate } from "../middlewares/validate";
import { createProductSchema, updateProductSchema } from "../validations/productValidation";
import * as productController from "../controllers/productController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Rotas de produtos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               categoria:
 *                 type: string
 *                 enum: [ELETRONICO, VESTUARIO, MOVEIS, LIVROS, ALIMENTOS, BELEZA]
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno
 */

router.post("/", validate(createProductSchema), productController.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   quantity:
 *                     type: integer
 *                   categoria:
 *                     type: string
 *                     enum: [ELETRONICO, VESTUARIO, MOVEIS, LIVROS, ALIMENTOS, BELEZA]
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 quantity:
 *                   type: integer
 *                 categoria:
 *                   type: string
 *                   enum: [ELETRONICO, VESTUARIO, MOVEIS, LIVROS, ALIMENTOS, BELEZA]
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/:id", productController.getById);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Exclui um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser excluído
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto excluído com sucesso
 * 
 *       400:
 *         description: Cliente está associado a um ou mais registros
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/:id", productController.deleteById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               categoria:
 *                 type: string
 *                 enum: [ELETRONICO, VESTUARIO, MOVEIS, LIVROS, ALIMENTOS, BELEZA]
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 quantity:
 *                   type: integer
 *                 categoria:
 *                   type: string
 *                   enum: [ELETRONICO, VESTUARIO, MOVEIS, LIVROS, ALIMENTOS, BELEZA]
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/:id", validate(updateProductSchema), productController.update);

export default router;