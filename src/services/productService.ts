import { EntityInUseError } from "../errors/EntityInUseError";
import { NotFoundError } from "../errors/NotFoundError";
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
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
        throw new NotFoundError("Produto não encontrado.");
    }

    return product;
}

async function deleteById(id: number) {

    const product = await prisma.product.findUnique({ where: { id }, include: { orderProducts: true } });

    if (!product) {
        throw new NotFoundError("Produto não encontrado.");
    }

    if (product.orderProducts.length > 0) {
        throw new EntityInUseError("Produto não pode ser deletado pois está associado a um ou mais registros.")
    }

    return await prisma.product.delete({
        where: { id },
    });
}

async function update(id: number, productDto: Partial<any>) {

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
        throw new NotFoundError("Produto não encontrado.");
    }

    return await prisma.product.update({
        where: { id },
        data: productDto,
    });
}

export { createProduct, getProducts, getById, deleteById, update };