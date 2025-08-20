"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = createClient;
exports.getClients = getClients;
exports.get = get;
exports.update = update;
exports.deleteById = deleteById;
const prisma_1 = require("../generated/prisma");
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
async function update(id, clientDto) {
    return await prisma.client.update({
        where: { id },
        data: clientDto
    });
}
async function deleteById(id) {
    return await prisma.client.delete({
        where: { id },
    });
}
