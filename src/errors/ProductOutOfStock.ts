export class ProductOutOfStock extends Error {
    statusCode: number;

    constructor(productName: string) {
        super(`Produto ${productName} está fora do estoque.`);
        this.name = "ProductOutOfStock";
        this.statusCode = 400;
    }
}