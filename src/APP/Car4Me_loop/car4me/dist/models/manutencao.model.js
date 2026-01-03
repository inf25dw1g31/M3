"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manutencao = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const veiculo_model_1 = require("./veiculo.model");
let Manutencao = class Manutencao extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Manutencao = Manutencao;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Manutencao.prototype, "id_manutencao", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Manutencao.prototype, "descricao", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Manutencao.prototype, "data_manutencao", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Manutencao.prototype, "custo", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => veiculo_model_1.Veiculo, { name: 'veiculo' }),
    tslib_1.__metadata("design:type", Number)
], Manutencao.prototype, "id_veiculo", void 0);
exports.Manutencao = Manutencao = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { mysql: { table: 'manutencoes' } } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Manutencao);
//# sourceMappingURL=manutencao.model.js.map