"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = require("../service/productService");
const CreateProductDto_1 = require("../dto/ProductDto/CreateProductDto");
const express_1 = require("express");
const class_validator_1 = require("class-validator");
const UpdateProductDto_1 = require("../dto/ProductDto/UpdateProductDto");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const productDto = Object.assign(new CreateProductDto_1.CreateProductDto(), req.body);
    const erros = await (0, class_validator_1.validate)(productDto);
    if (erros.length > 0) {
        const errosFormatados = erros.map(e => ({
            campo: e.property,
            messagem: Object.values(e.constraints || {})
        }));
        return res.status(400).json(errosFormatados);
    }
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
    const productDto = Object.assign(new UpdateProductDto_1.UpdateProductDto(), req.body);
    const erros = await (0, class_validator_1.validate)(productDto, { skipMissingProperties: true });
    if (erros.length > 0) {
        const errosFormatados = erros.filter(e => (Object.keys(req.body).includes(e.property))).map(e => ({
            campo: e.property,
            messagem: Object.values(e.constraints || {})
        }));
        return res.status(400).json(errosFormatados);
    }
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
