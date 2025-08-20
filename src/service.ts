import { CreateClientDto } from "./clientDto";
import { PrismaClient } from "./generated/prisma";

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

export { createClient, getClients, get };