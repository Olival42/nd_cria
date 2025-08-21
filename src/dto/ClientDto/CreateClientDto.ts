import "reflect-metadata";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { CPFValidated } from "../../validator/CPFValidate";

export class CreateClientDto {

    @IsNotEmpty({ message: "Nome é obrigatório." })
    @Matches(/^[A-Za-zÀ-ÿ\s]+$/, { message: "Nome deve conter apenas letras" })
    name: string

    @IsEmail({}, { message: "E-mail inválido." })
    email: string

    @IsNotEmpty({ message: "CPF é obrigatório." })
    @CPFValidated()
    cpf: string

    @IsNotEmpty({ message: "Telefone é obrigatório." })
    @Matches(/^\d{2}\d{4,5}\d{4}$/, { message: "Telefone inválido" })
    phone: string
}