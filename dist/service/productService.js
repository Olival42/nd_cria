"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.get = get;
exports.deleteById = deleteById;
exports.update = update;
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
async function createProduct(productDto) {
    return await prisma.product.create({
        data: productDto,
    });
}
async function getProducts() {
    return await prisma.product.findMany();
}
async function get(id) {
    return await prisma.product.findUnique({
        where: { id },
    });
}
async function deleteById(id) {
    return await prisma.product.delete({
        where: { id },
    });
}
async function update(id, productDto) {
    return await prisma.product.update({
        where: { id },
        data: productDto,
    });
}
