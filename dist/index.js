"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const newClient = await prisma.client.create({
        data: {
            name: 'Joana Darqui',
            age: 136,
            email: 'joana@dark.com',
            phone: '449999999999'
        },
    });
}
main()
    .finally(() => prisma.$disconnect());
