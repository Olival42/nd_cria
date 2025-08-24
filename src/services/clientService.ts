import { EntityInUseError } from "../errors/EntityInUseError";
import { NotFoundError } from "../errors/NotFoundError";
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

    const client = await prisma.client.findUnique({ where: { id } });

    if (!client) {
        throw new NotFoundError("Cliente não encontrado.");
    }

    return await prisma.client.findUnique({
        where: { id },
    });
}

async function update(id: number, clientDto: Partial<any>) {
    const client = await prisma.client.findUnique({ where: { id } });

    if (!client) {
        throw new NotFoundError("Cliente não encontrado.");
    }

    return await prisma.client.update({
        where: { id },
        data: clientDto
    });
}

async function deleteById(id: number) {

    const client = await prisma.client.findUnique({ where: { id }, include: { orders: true } });

    if (!client) {
        throw new NotFoundError("Cliente não encontrado.");
    }

    if (client.orders.length > 0) {
        throw new EntityInUseError("Cliente não pode ser deletado pois está associado a um ou mais registros.")
    }

    return await prisma.client.delete({
        where: { id },
    });
}

export { createClient, getClients, getById, update, deleteById };