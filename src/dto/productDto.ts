import { Categoria } from "../generated/prisma"

export interface CreateProductDto {
    name: string
    description?: string
    price: number
    quantity: number
    categoria: Categoria
}