import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors/NotFoundError";
import { EntityInUseError } from "../errors/EntityInUseError";
import { ProductOutOfStock } from "../errors/ProductOutOfStock";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);

    if (err instanceof NotFoundError || err instanceof EntityInUseError || err instanceof ProductOutOfStock) {
        return res.status(err.statusCode).json({
            error: err.name,
            message: err.message
        });
    }

    res.status(500).json({ message: "Erro interno do servidor" });
}