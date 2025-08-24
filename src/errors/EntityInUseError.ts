export class EntityInUseError extends Error {
    statusCode: number;

    constructor(message: string = "Recurso não pode ser deletado pois está associado a um ou mais registros.") {
        super(message);
        this.name = "EntityInUseError";
        this.statusCode = 400;
    }
}