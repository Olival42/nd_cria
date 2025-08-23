import { PrismaClient } from "../generated/prisma";
import { NotFoundError } from "../errors/NotFoundError";

export interface OrderProductInput {
    productId: number;
    quantity: number;
}

const prisma = new PrismaClient();

async function createOrder(clientId: number, products: OrderProductInput[]) {
    const { orderProducts, total } = await createOrderProducts(products);

    const result = await prisma.$transaction(async (prisma) => {
        const order = await prisma.order.create({
            data: {
                clientId,
                total,
                pedidos: {
                    create: orderProducts,
                },
            },
            include: { pedidos: true },
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

async function createOrderProducts(products: OrderProductInput[]) {

    const productIds = products
        .map(p => p.productId)
        .filter(id => id != null);

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

    const total = orderProducts.reduce((acc, item) => acc + item.subTotal, 0);

    return { orderProducts, total };
}

export { createOrder };