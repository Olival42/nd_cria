import { createProduct, getProducts, get, deleteById, update } from "../service/productService";
import { CreateProductDto } from "../dto/ProductDto/CreateProductDto";
import { UpdateProductDto } from "../dto/ProductDto/UpdateProductDto";
import { validate } from "class-validator";
import { Router, Request, Response } from "express";

const router = Router();

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
 *           example: "Notebook"
 *         description:
 *           type: string
 *           example: "Notebook 16GB RAM"
 *         price:
 *           type: number
 *           example: 2500
 *         quantity:
 *           type: integer
 *           example: 10
 *         categoria:
 *           type: string
 *           enum: [ELETRONICO, VESTUARIO, MOVEIS, LIVROS, ALIMENTOS, BELEZA]
 *           example: ELETRONICO
 *     CreateProductDto:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - quantity
 *         - categoria
 *       properties:
 *         name:
 *           type: string
 *           example: "Notebook"
 *         description:
 *           type: string
 *           example: "Notebook 16GB RAM"
 *         price:
 *           type: number
 *           example: 2500
 *         quantity:
 *           type: integer
 *           example: 10
 *         categoria:
 *           type: string
 *           enum: [ELETRONICO, VESTUARIO, MOVEIS, LIVROS, ALIMENTOS, BELEZA]
 *           example: ELETRONICO
 *     UpdateProductDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Notebook"
 *         description:
 *           type: string
 *           example: "Notebook atualizado"
 *         price:
 *           type: number
 *           example: 2600
 *         quantity:
 *           type: integer
 *           example: 15
 *         categoria:
 *           type: string
 *           enum: [ELETRONICO, VESTUARIO, MOVEIS, LIVROS, ALIMENTOS, BELEZA]
 *           example: ELETRONICO
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Rotas de gerenciamento de produtos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cadastrar um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductDto'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Erros de validação
 */
router.post("/", async (req: Request, res: Response) => {
    const productDto = Object.assign(new CreateProductDto(), req.body);
    const erros = await validate(productDto);

    if (erros.length > 0) {
        const errosFormatados = erros.map(e => ({
            campo: e.property,
            messagem: Object.values(e.constraints || {})
        }));
        return res.status(400).json(errosFormatados);
    }

    try {
        const product = await createProduct(productDto);
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao cadastrar o produto." });
    }
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", async (req: Request, res: Response) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar os produtos." });
    }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Buscar produto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 */
router.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        const product = await get(id);

        if (!product) {
            return res.status(404).json({ message: "Produto não encontrado." })
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar o produto." });
    }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualizar produto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductDto'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 */
router.put("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const productDto = Object.assign(new UpdateProductDto(), req.body);
    const erros = await validate(productDto, { skipMissingProperties: true });

    if (erros.length > 0) {
        const errosFormatados = erros.filter(e => (
            Object.keys(req.body).includes(e.property)
        )).map(e => ({
            campo: e.property,
            messagem: Object.values(e.constraints || {})
        }));
        return res.status(400).json(errosFormatados);
    }

    try {
        const product = await update(id, productDto);
        res.status(200).json(product);
    } catch (error: any) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({ message: "Produto não encontrado." });
        }

        res.status(500).json({ message: "Erro ao atualizar o produto." });
    }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deletar produto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        await deleteById(id);
        res.status(200).json({ message: "Produto excluido com sucesso." });
    } catch (error: any) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({ message: "Produto não encontrado." });
        }

        res.status(500).json({ message: "Erro ao deletar o produto." });
    }
});

export default router;
