import { PrismaClient } from "../generated/prisma";
import { NotFoundError } from "../errors/NotFoundError";

export interface OrderProductInput {
    productId: number;
    quantity: number;
}

const prisma = new PrismaClient();

async function createOrder(clientId: number, products: OrderProductInput[]) {

    const { orderProducts } = await createOrderProducts(products);
    const total = calculateTotal(orderProducts);

    const result = await prisma.$transaction(async (prisma) => {
        const order = await prisma.order.create({
            data: {
                clientId,
                total,
                pedidos: {
                    create: orderProducts,
                },
            },
            include: {
                pedidos: {
                    include: { product: true }
                }
            }
        });

        for (const p of orderProducts) {
            await prisma.product.update({
                where: { id: p.productId },
                data: {
                    quantity: { decrement: p.quantity }
                },
            });
        }

        return order;
    });

    return result;
}

async function getOrders(clientId: number) {

    return clientId ? await prisma.order.findMany({
        where: { clientId },
        include: {
            pedidos: {
                include: { product: true }
            }
        },
    }) : await prisma.order.findMany({
        include: {
            pedidos: {
                include: { product: true }
            }
        },
    });
}

async function getOrderById(id: number) {
    return await prisma.order.findUnique({
        where: { id },
        include: {
            pedidos: {
                include: { product: true }
            }
        },
    }).catch(() => null);
}

async function deleteById(id: number) {

    try {
        await prisma.orderProduct.deleteMany({
            where: { orderId: id },
        });

        return await prisma.order.delete({
            where: { id },
        });
    } catch (error: any) {
        if (error.code === "P2025") {
            return null;
        }
        throw error;
    }
}

async function updateById(id: number, products: OrderProductInput[]) {

    const { orderProducts } = await createOrderProducts(products);
    const productIds = products.map(p => p.productId);

    try {
        return prisma.$transaction(async (prisma) => {
            await prisma.orderProduct.deleteMany({
                where: {
                    orderId: id,
                    productId: {
                        in: productIds
                    },
                },
            });

            const orderUpdated = await prisma.order.update({
                where: { id },
                data: {
                    pedidos: { create: orderProducts }
                },
                include: { pedidos: true },
            });

            return await prisma.order.update({
                where: { id },
                data: {
                    total: calculateTotal(orderUpdated.pedidos)
                },
                include: {
                    pedidos: {
                        include: { product: true }
                    },
                },
            });
        });
    }
    catch (error: any) {
        if (error.code === "P2025") {
            return null;
        }
        throw error;
    }
}

async function createOrderProducts(products: OrderProductInput[]) {

    const productIds = products.map(p => p.productId)

    const dbProducts = await prisma.product.findMany({
        where: {
            id: { in: productIds }
        }
    });

    const orderProducts = products.map((p) => {
        const product = dbProducts.find((db) => db.id === p.productId)
        if (!product) {
            throw new NotFoundError("Produto não encontrado.");
        }

        return {
            productId: product.id,
            quantity: p.quantity,
            subTotal: product.price * p.quantity,
        };
    });

    return { orderProducts };
}

function calculateTotal(orderProducts: any) {
    return orderProducts.reduce((acc: number, item: { subTotal: number }) => acc + item.subTotal, 0);
}

export { createOrder, getOrders, getOrderById, deleteById, updateById };