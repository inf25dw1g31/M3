"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const reserva_model_1 = require("./reserva.model");
const veiculo_model_1 = require("./veiculo.model");
const cliente_favorito_model_1 = require("./cliente-favorito.model");
let Cliente = class Cliente extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Cliente = Cliente;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Cliente.prototype, "id_cliente", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Cliente.prototype, "nome", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        //adicionar validação de email [Sabemos que é feita na BD, mas fica aqui para reforçar]
        jsonSchema: { maxLength: 150, format: 'email' },
    }),
    tslib_1.__metadata("design:type", String)
], Cliente.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Cliente.prototype, "telefone", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        //adicionar validação de NIF [Sabemos que é feita na BD]
        jsonSchema: { minLength: 9, maxLength: 9, pattern: '^[0-9]+$' },
    }),
    tslib_1.__metadata("design:type", String)
], Cliente.prototype, "nif", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Cliente.prototype, "morada", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => reserva_model_1.Reserva, { keyTo: 'id_cliente' }),
    tslib_1.__metadata("design:type", Array)
], Cliente.prototype, "reservas", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => veiculo_model_1.Veiculo, { through: { model: () => cliente_favorito_model_1.ClienteFavorito, keyFrom: 'id_cliente', keyTo: 'id_veiculo' } }),
    tslib_1.__metadata("design:type", Array)
], Cliente.prototype, "veiculos", void 0);
exports.Cliente = Cliente = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { mysql: { table: 'clientes' } } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Cliente);
//# sourceMappingURL=cliente.model.js.map