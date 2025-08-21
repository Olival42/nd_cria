import { createProduct, getProducts, get, deleteById, update } from "../service/productService";
import { CreateProductDto } from "../dto/ProductDto/CreateProductDto";
import express, { Request, Response, Router } from "express";
import { validate } from "class-validator";
import { UpdateProductDto } from "../dto/ProductDto/UpdateProductDto";

const router = Router();

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

router.get("/", async (req: Request, res: Response) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar os produtos." });
    }
});

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

router.delete("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        await deleteById(id);
        res.status(200).json({ message: "Produto excluido com sucesso." });
    } catch (error: any) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }

        res.status(500).json({ message: "Erro ao atualizar o cliente." });
    }
});

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
            return res.status(404).json({ message: "Cliente não encontrado." });
        }

        res.status(500).json({ message: "Erro ao atualizar o cliente." });
    }
});

export default router;