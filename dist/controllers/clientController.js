"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = createClient;
exports.getClients = getClients;
exports.getById = getById;
exports.deleteById = deleteById;
exports.update = update;
const NotFoundError_1 = require("../errors/NotFoundError");
const clientService = __importStar(require("../services/clientService"));
async function createClient(req, res, next) {
    try {
        const client = await clientService.createClient(req.body);
        return res.status(201).json(client);
    }
    catch (error) {
        next(error);
    }
}
async function getClients(req, res, next) {
    try {
        const clients = await clientService.getClients();
        return res.status(200).json(clients);
    }
    catch (error) {
        next(error);
    }
}
async function getById(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const client = await clientService.getById(id);
        if (!client) {
            throw new NotFoundError_1.NotFoundError("Cliente não encontrado.");
        }
        return res.status(200).json(client);
    }
    catch (error) {
        next(error);
    }
}
async function deleteById(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const client = await clientService.deleteById(id);
        if (!client) {
            throw new NotFoundError_1.NotFoundError("Cliente não encontrado.");
        }
        return res.status(200).json(client);
    }
    catch (error) {
        next(error);
    }
}
async function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const client = await clientService.update(id, req.body);
        if (!client) {
            throw new NotFoundError_1.NotFoundError("Cliente não encontrado.");
        }
        return res.status(200).json({ message: "Cliente excluido com sucesso." });
    }
    catch (error) {
        next(error);
    }
}
