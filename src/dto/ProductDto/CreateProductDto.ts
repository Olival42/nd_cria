import "reflect-metadata";
import { IsNotEmpty, Min, IsNumber, IsInt, IsEnum, Matches } from "class-validator";

import { Categoria } from "../../generated/prisma"

export class CreateProductDto {

    @IsNotEmpty({ message: "Nome é obrigatório" })
    @Matches(/^[A-Za-zÀ-ÿ\s]+$/, { message: "Nome deve conter apenas letras" })
    name: string

    description?: string

    @IsNotEmpty({ message: "Preço é obrigatório" })
    @Min(1, { message: "Preço mínimo é 1" })
    @IsNumber()
    price: number

    @IsNotEmpty({ message: "Quantidade disponível é obrigatório" })
    @Min(1, { message: "Quantidade mínimo é 1" })
    @IsInt({ message: "Quantidade deve ser um inteiro" })
    quantity: number

    @IsEnum(Categoria, {
        message: "Categoria deve ser apenas ELETRONICO, VESTUARIO, MOVEIS, LIVROS, ALIMENTOS, BELEZA"
    })
    categoria: Categoria
}