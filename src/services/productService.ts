import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function createProduct(productDto: any) {
    return await prisma.product.create({
        data: productDto,
    });
}

async function getProducts() {
    return await prisma.product.findMany();
}

async function getById(id: number) {
    return await prisma.product.findUnique({
        where: { id },
    });
}

async function deleteById(id: number) {
    return await prisma.product.delete({
        where: { id },
    }).catch(() => null);
}

async function update(id: number, productDto: Partial<any>) {
    return await prisma.product.update({
        where: { id },
        data: productDto,
    }).catch(() => null);
}

export { createProduct, getProducts, getById, deleteById, update };