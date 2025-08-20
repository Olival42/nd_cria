import { PrismaClient } from "../generated/prisma";
import { CreateProductDto } from "../dto/productDto";

const prisma = new PrismaClient();

async function createProduct(productDto: CreateProductDto) {
    return await prisma.product.create({
        data: productDto,
    });
}

async function getProducts() {
    return await prisma.product.findMany();
}

async function get(id: number) {
    return await prisma.product.findUnique({
        where: { id },
    });
}

async function deleteById(id: number) {
    return await prisma.product.delete({
        where: { id },
    });
}

async function update(id: number, productDto: Partial<CreateProductDto>) {
    return await prisma.product.update({
        where: { id },
        data: productDto,
    });
}

export { createProduct, getProducts, get, deleteById, update };