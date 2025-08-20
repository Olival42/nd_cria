"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientService_1 = require("../service/clientService");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const clientDto = req.body;
    try {
        const client = await (0, clientService_1.createClient)(clientDto);
        res.status(201).json(client);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar cliente" });
    }
});
router.get("/", async (req, res) => {
    try {
        const clients = await (0, clientService_1.getClients)();
        res.status(200).json(clients);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar os clientes" });
    }
});
router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const client = await (0, clientService_1.get)(id);
        if (!client) {
            return res.status(404).json({ message: "Cliente não foi encontrado." });
        }
        res.status(200).json(client);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar o cliente." });
    }
});
router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    try {
        const client = await (0, clientService_1.update)(id, data);
        res.status(200).json(client);
    }
    catch (error) {
        console.error(error);
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }
        res.status(500).json({ message: "Erro ao atualizar o cliente." });
    }
});
router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await (0, clientService_1.deleteById)(id);
        res.status(200).json({ message: "Cliente excluido com sucesso." });
    }
    catch (error) {
        console.error(error);
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }
        res.status(500).json({ message: "Erro ao deletar o cliente" });
    }
});
exports.default = router;
