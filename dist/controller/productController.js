"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = require("../service/productService");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const productDto = req.body;
    try {
        const product = await (0, productService_1.createProduct)(productDto);
        res.status(201).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao cadastrar o produto." });
    }
});
router.get("/", async (req, res) => {
    try {
        const products = await (0, productService_1.getProducts)();
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar os produtos." });
    }
});
router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const product = await (0, productService_1.get)(id);
        if (!product) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar o produto." });
    }
});
router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await (0, productService_1.deleteById)(id);
        res.status(200).json({ message: "Produto excluido com sucesso." });
    }
    catch (error) {
        console.error(error);
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }
        res.status(500).json({ message: "Erro ao atualizar o cliente." });
    }
});
router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const productDto = req.body;
    try {
        const product = await (0, productService_1.update)(id, productDto);
        res.status(200).json(product);
    }
    catch (error) {
        console.error(error);
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }
        res.status(500).json({ message: "Erro ao atualizar o cliente." });
    }
});
exports.default = router;
