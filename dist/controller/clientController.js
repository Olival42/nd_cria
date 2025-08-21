"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientService_1 = require("../service/clientService");
const CreateClientDto_1 = require("../dto/ClientDto/CreateClientDto");
const express_1 = require("express");
const class_validator_1 = require("class-validator");
const UpdateClientDto_1 = require("../dto/ClientDto/UpdateClientDto");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const clientDto = Object.assign(new CreateClientDto_1.CreateClientDto(), req.body);
    const erros = await (0, class_validator_1.validate)(clientDto);
    if (erros.length > 0) {
        const errosFromatados = erros.map(e => ({
            campo: e.property,
            mensagens: Object.values(e.constraints || {})
        }));
        return res.status(400).json(errosFromatados);
    }
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
    const clientDto = Object.assign(new UpdateClientDto_1.UpdateClientDto(), req.body);
    const erros = await (0, class_validator_1.validate)(clientDto, { skipMissingProperties: true });
    // skipMissingProperties: true -> ignora campos que não foram enviados
    if (erros.length > 0) {
        const errosFromatados = erros.filter(e => (Object.keys(req.body).includes(e.property))).map(e => ({
            campo: e.property,
            mensagens: Object.values(e.constraints || {})
        }));
        return res.status(400).json(errosFromatados);
    }
    try {
        const client = await (0, clientService_1.update)(id, clientDto);
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
