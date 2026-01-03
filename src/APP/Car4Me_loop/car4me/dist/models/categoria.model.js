"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const veiculo_model_1 = require("./veiculo.model");
let Categoria = class Categoria extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Categoria = Categoria;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Categoria.prototype, "id_categoria", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        //adicionar validação [Sabemos que é feita na BD, mas fica aqui para reforçar]
        jsonSchema: { maxLength: 50 },
    }),
    tslib_1.__metadata("design:type", String)
], Categoria.prototype, "nome", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Categoria.prototype, "preco_dia", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => veiculo_model_1.Veiculo, { keyTo: 'id_categoria' }),
    tslib_1.__metadata("design:type", Array)
], Categoria.prototype, "veiculos", void 0);
exports.Categoria = Categoria = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { mysql: { table: 'categorias' } } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Categoria);
//# sourceMappingURL=categoria.model.js.map