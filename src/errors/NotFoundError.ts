export class NotFoundError extends Error {
    statusCode: number;

    constructor(message: string = "Recurso não encontrado") {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}