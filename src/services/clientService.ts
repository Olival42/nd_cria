import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function createClient(clientDto: any) {
    return await prisma.client.create({
        data: clientDto,
    });
}

async function getClients() {
    return await prisma.client.findMany();
}

async function getById(id: number) {
    return await prisma.client.findUnique({
        where: { id },
    });
}

async function update(id: number, clientDto: Partial<any>) {
    return await prisma.client.update({
        where: { id },
        data: clientDto
    }).catch(() => null);
}

async function deleteById(id: number) {
    return await prisma.client.delete({
        where: { id },
    }).catch(() => null);
}

export { createClient, getClients, getById, update, deleteById };