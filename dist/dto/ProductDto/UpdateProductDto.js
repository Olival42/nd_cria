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
exports.UpdateProductDto = void 0;
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const prisma_1 = require("../../generated/prisma");
class UpdateProductDto {
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, class_validator_1.Matches)(/^[A-Za-zÀ-ÿ\s]+$/, { message: "Nome deve conter apenas letras" }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: "Preço mínimo é 1" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: "Quantidade mínimo é 1" }),
    (0, class_validator_1.IsInt)({ message: "Quantidade deve ser um inteiro" }),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(prisma_1.Categoria, {
        message: "Categoria deve ser apenas ELETRONICO, VESTUARIO, MOVEIS, LIVROS, ALIMENTOS, BELEZA"
    }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "categoria", void 0);
