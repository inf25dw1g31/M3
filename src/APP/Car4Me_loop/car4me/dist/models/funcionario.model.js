"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcionario = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const reserva_model_1 = require("./reserva.model");
let Funcionario = class Funcionario extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Funcionario = Funcionario;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Funcionario.prototype, "id_funcionario", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Funcionario.prototype, "nome", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Funcionario.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Funcionario.prototype, "cargo", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Funcionario.prototype, "telefone", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => reserva_model_1.Reserva, { keyTo: 'id_funcionario' }),
    tslib_1.__metadata("design:type", Array)
], Funcionario.prototype, "reservas", void 0);
exports.Funcionario = Funcionario = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { mysql: { table: 'funcionarios' } } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Funcionario);
//# sourceMappingURL=funcionario.model.js.map