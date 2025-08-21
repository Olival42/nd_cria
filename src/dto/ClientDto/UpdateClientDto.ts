import "reflect-metadata";
import { IsEmail, Matches } from "class-validator";
import { CPFValidated } from "../../validator/CPFValidate";

export class UpdateClientDto {

    @Matches(/^[A-Za-zÀ-ÿ\s]+$/, { message: "Nome deve conter apenas letras" })
    name: string

    @IsEmail({}, { message: "E-mail inválido." })
    email: string

    @CPFValidated()
    cpf: string

    @Matches(/^\d{2}\d{4,5}\d{4}$/, { message: "Telefone inválido" })
    phone: string
}