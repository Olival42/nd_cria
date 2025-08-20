"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = createClient;
exports.getClients = getClients;
exports.get = get;
const prisma_1 = require("./generated/prisma");
const prisma = new prisma_1.PrismaClient();
async function createClient(clientDto) {
    return await prisma.client.create({
        data: clientDto,
    });
}
async function getClients() {
    return await prisma.client.findMany();
}
async function get(id) {
    return await prisma.client.findUnique({
        where: { id },
    });
}
