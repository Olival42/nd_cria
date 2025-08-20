"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("./service");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const clientDto = req.body;
    try {
        const client = await (0, service_1.createClient)(clientDto);
        res.status(201).json(client);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar cliente" });
    }
});
router.get("/get", async (req, res) => {
    try {
        const clients = await (0, service_1.getClients)();
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
        const client = await (0, service_1.get)(id);
        if (!client) {
            return res.status(404).json({ message: "Cliente não foi encontrado." });
        }
        res.status(200).json(client);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar o cliente" });
    }
});
exports.default = router;
