import { CreateClientDto } from "../dto/clientDto";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function createClient(clientDto: CreateClientDto) {
    return await prisma.client.create({
        data: clientDto,
    });
}

async function getClients() {
    return await prisma.client.findMany();
}

async function get(id: number) {
    return await prisma.client.findUnique({
        where: { id },
    });
}

async function update(id: number, clientDto: Partial<CreateClientDto>) {
    return await prisma.client.update({
        where: { id },
        data: clientDto
    });
}

async function deleteById(id: number) {
    return await prisma.client.delete({
        where: { id },
    });
}

export { createClient, getClients, get, update, deleteById };