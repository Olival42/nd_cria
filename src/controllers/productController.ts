import * as productSevice from "../services/productService";
import { Request, Response, NextFunction } from "express";

export async function createProduct(req: Request, res: Response, next: NextFunction) {

    try {
        const product = await productSevice.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}

export async function getProducts(req: Request, res: Response, next: NextFunction) {

    try {
        const products = await productSevice.getProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id)
        const product = await productSevice.getById(id);

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

export async function deleteById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id)
        await productSevice.deleteById(id);

        res.status(200).json("Produto excluído com sucesso.");
    } catch (error) {
        next(error);
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id)
        const product = await productSevice.update(id, req.body);

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}