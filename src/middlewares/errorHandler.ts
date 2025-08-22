import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors/NotFoundError";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);

    if (err instanceof NotFoundError) {
        return res.status(err.statusCode).json({
            error: err.name,
            message: err.message
        });
    }

    res.status(500).json({ message: "Erro interno do servidor" });
}