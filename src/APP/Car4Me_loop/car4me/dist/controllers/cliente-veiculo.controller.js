"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteVeiculoController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ClienteVeiculoController = class ClienteVeiculoController {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async find(id, filter) {
        return this.clienteRepository.veiculos(id).find(filter);
    }
    async create(id, veiculo) {
        return this.clienteRepository.veiculos(id).create(veiculo);
    }
    async patch(id, veiculo, where) {
        return this.clienteRepository.veiculos(id).patch(veiculo, where);
    }
    async delete(id, where) {
        return this.clienteRepository.veiculos(id).delete(where);
    }
};
exports.ClienteVeiculoController = ClienteVeiculoController;
tslib_1.__decorate([
    (0, rest_1.get)('/clientes/{id}/veiculos', {
        responses: {
            '200': {
                description: 'Array of Cliente has many Veiculo through ClienteFavorito',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Veiculo) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteVeiculoController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/clientes/{id}/veiculos', {
        responses: {
            '200': {
                description: 'create a Veiculo model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Veiculo) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Veiculo, {
                    title: 'NewVeiculoInCliente',
                    exclude: ['id_veiculo'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteVeiculoController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/clientes/{id}/veiculos', {
        responses: {
            '200': {
                description: 'Cliente.Veiculo PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Veiculo, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Veiculo))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteVeiculoController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/clientes/{id}/veiculos', {
        responses: {
            '200': {
                description: 'Cliente.Veiculo DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Veiculo))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteVeiculoController.prototype, "delete", null);
exports.ClienteVeiculoController = ClienteVeiculoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ClienteRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ClienteRepository])
], ClienteVeiculoController);
//# sourceMappingURL=cliente-veiculo.controller.js.map