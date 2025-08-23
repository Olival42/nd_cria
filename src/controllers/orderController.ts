import { NotFoundError } from "../errors/NotFoundError";
import * as orderService from "../services/orderSevice";
import { NextFunction, Request, Response } from "express";

export async function createOrder(req: Request, res: Response, next: NextFunction) {

    const { clientId, products } = req.body;

    try {
        const order = await orderService.createOrder(clientId, products);
        return res.status(201).json(order);
    } catch (error) {
        next(error);
    }
}

export async function getOrders(req: Request, res: Response, next: NextFunction) {

    const id = Number(req.query.clientId);

    try {
        const orders = await orderService.getOrders(id);
        return res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
}

export async function getOrderById(req: Request, res: Response, next: NextFunction) {

    const id = parseInt(req.params.id);

    try {
        const order = await orderService.getOrderById(id);

        if (!order) {
            throw new NotFoundError("Pedido não encontrado.");
        }

        return res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}

export async function deleteById(req: Request, res: Response, next: NextFunction) {

    const id = parseInt(req.params.id);

    try {
        const order = await orderService.deleteById(id);

        if (!order) {
            throw new NotFoundError("Pedido não encontrado.");
        }

        return res.status(200).json({ message: "Pedido excluído com sucesso." });
    } catch (error) {
        next(error);
    }
}

export async function updateById(req: Request, res: Response, next: NextFunction) {

    const id = parseInt(req.params.id);
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "O campo 'products' deve ser um array com pelo menos um item." });
    }

    try {
        const order = await orderService.updateById(id, products);

        if (!order) {
            throw new NotFoundError("Pedido não encontrado.");
        }

        return res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}
