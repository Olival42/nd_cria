import { NotFoundError } from "../errors/NotFoundError";
import * as ordertService from "../services/orderSevice";
import { NextFunction, Request, Response } from "express";

export async function createOrder(req: Request, res: Response, next: NextFunction) {

    const { clientId, products } = req.body;

    try {
        const client = await ordertService.createOrder(clientId, products);
        return res.status(201).json(client);
    } catch (error) {
        next(error);
    }
}
