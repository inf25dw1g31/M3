"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veiculo = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const categoria_model_1 = require("./categoria.model");
const reserva_model_1 = require("./reserva.model");
const manutencao_model_1 = require("./manutencao.model");
const cliente_model_1 = require("./cliente.model");
const cliente_favorito_model_1 = require("./cliente-favorito.model");
let Veiculo = class Veiculo extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Veiculo = Veiculo;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Veiculo.prototype, "id_veiculo", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        jsonSchema: {
            enum: [
                'Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Renault', 'Peugeot', 'Citroen', 'Toyota',
                'Nissan', 'Honda', 'Hyundai', 'Kia', 'Ford', 'Opel', 'Volvo', 'Fiat', 'Seat', 'Skoda',
                'Mazda', 'Mitsubishi', 'Jeep', 'Land Rover', 'Mini', 'Porsche', 'Lexus', 'Subaru',
                'Alfa Romeo', 'Dacia', 'Jaguar', 'Chevrolet',
            ],
        }
    }),
    tslib_1.__metadata("design:type", String)
], Veiculo.prototype, "marca", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Veiculo.prototype, "modelo", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        jsonSchema: { maxLength: 20 },
    }),
    tslib_1.__metadata("design:type", String)
], Veiculo.prototype, "matricula", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Veiculo.prototype, "ano", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Veiculo.prototype, "cor", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        default: 0,
    }),
    tslib_1.__metadata("design:type", Number)
], Veiculo.prototype, "quilometragem", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => categoria_model_1.Categoria, { name: 'categoria' }),
    tslib_1.__metadata("design:type", Number)
], Veiculo.prototype, "id_categoria", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => reserva_model_1.Reserva, { keyTo: 'id_veiculo' }),
    tslib_1.__metadata("design:type", Array)
], Veiculo.prototype, "reservas", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => manutencao_model_1.Manutencao, { keyTo: 'id_veiculo' }),
    tslib_1.__metadata("design:type", Array)
], Veiculo.prototype, "manutencoes", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => cliente_model_1.Cliente, { through: { model: () => cliente_favorito_model_1.ClienteFavorito, keyFrom: 'id_veiculo', keyTo: 'id_cliente' } }),
    tslib_1.__metadata("design:type", Array)
], Veiculo.prototype, "clientes", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        jsonSchema: {
            enum: ['Disponivel', 'Alugado', 'Manutencao'],
            default: 'Disponivel',
        },
        default: 'Disponivel',
    }),
    tslib_1.__metadata("design:type", String)
], Veiculo.prototype, "estado", void 0);
exports.Veiculo = Veiculo = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { mysql: { table: 'veiculos' } } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Veiculo);
//# sourceMappingURL=veiculo.model.js.map