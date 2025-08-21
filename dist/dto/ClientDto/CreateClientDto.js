"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientDto = void 0;
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const CPFValidate_1 = require("../../validator/CPFValidate");
class CreateClientDto {
}
exports.CreateClientDto = CreateClientDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Nome é obrigatório." }),
    (0, class_validator_1.Matches)(/^[A-Za-zÀ-ÿ\s]+$/, { message: "Nome deve conter apenas letras" }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: "E-mail inválido." }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "CPF é obrigatório." }),
    (0, CPFValidate_1.CPFValidated)(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Telefone é obrigatório." }),
    (0, class_validator_1.Matches)(/^\d{2}\d{4,5}\d{4}$/, { message: "Telefone inválido" }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "phone", void 0);
