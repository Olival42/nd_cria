import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function CPFValidated(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "CPFValidated",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (typeof value !== "string") return false;

                    const cpf = value.replace(/\D/g, "");

                    if (!/^\d{11}$/.test(cpf)) return false;

                    if (/^(\d)\1{10}$/.test(cpf)) return false;

                    let sum = 0;
                    for (let i = 0; i < 9; i++) {
                        sum += Number(cpf.charAt(i)) * (10 - i);
                    }
                    let firstDigit = (sum * 10) % 11;
                    if (firstDigit === 10) firstDigit = 0;

                    // cálculo do segundo dígito verificador
                    sum = 0;
                    for (let i = 0; i < 10; i++) {
                        sum += Number(cpf.charAt(i)) * (11 - i);
                    }
                    let secondDigit = (sum * 10) % 11;
                    if (secondDigit === 10) secondDigit = 0;

                    return firstDigit === Number(cpf.charAt(9)) && secondDigit === Number(cpf.charAt(10));
                },
                defaultMessage(args: ValidationArguments) {
                    return `CPF inválido.`;
                }
            }
        });
    };
}
