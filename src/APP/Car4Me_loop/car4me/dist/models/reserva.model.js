"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserva = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const cliente_model_1 = require("./cliente.model");
const funcionario_model_1 = require("./funcionario.model");
const veiculo_model_1 = require("./veiculo.model");
//Adicionar conexação tabela base de dados
let Reserva = class Reserva extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Reserva = Reserva;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Reserva.prototype, "id_reserva", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
    }),
    tslib_1.__metadata("design:type", Date)
], Reserva.prototype, "data_inicio", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
    }),
    tslib_1.__metadata("design:type", Date)
], Reserva.prototype, "data_fim", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => cliente_model_1.Cliente, { name: 'cliente' }),
    tslib_1.__metadata("design:type", Number)
], Reserva.prototype, "id_cliente", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => funcionario_model_1.Funcionario, { name: 'funcionario' }),
    tslib_1.__metadata("design:type", Number)
], Reserva.prototype, "id_funcionario", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => veiculo_model_1.Veiculo, { name: 'veiculo' }),
    tslib_1.__metadata("design:type", Number)
], Reserva.prototype, "id_veiculo", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Reserva.prototype, "preco_total", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        jsonSchema: {
            enum: ['ativa', 'concluida', 'cancelada'],
            default: 'ativa',
        },
        default: 'ativa',
    }),
    tslib_1.__metadata("design:type", String)
], Reserva.prototype, "estado", void 0);
exports.Reserva = Reserva = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { mysql: { table: 'reservas' } } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Reserva);
//# sourceMappingURL=reserva.model.js.map