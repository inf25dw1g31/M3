"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteReservaController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ClienteReservaController = class ClienteReservaController {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async find(id, filter) {
        return this.clienteRepository.reservas(id).find(filter);
    }
    async create(id, reserva) {
        return this.clienteRepository.reservas(id).create(reserva);
    }
    async patch(id, reserva, where) {
        return this.clienteRepository.reservas(id).patch(reserva, where);
    }
    async delete(id, where) {
        return this.clienteRepository.reservas(id).delete(where);
    }
};
exports.ClienteReservaController = ClienteReservaController;
tslib_1.__decorate([
    (0, rest_1.get)('/clientes/{id}/reservas', {
        responses: {
            '200': {
                description: 'Array of Cliente has many Reserva',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Reserva) },
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
], ClienteReservaController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/clientes/{id}/reservas', {
        responses: {
            '200': {
                description: 'Cliente model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Reserva) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Reserva, {
                    title: 'NewReservaInCliente',
                    exclude: ['id_reserva'],
                    optional: ['id_cliente']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteReservaController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/clientes/{id}/reservas', {
        responses: {
            '200': {
                description: 'Cliente.Reserva PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Reserva, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Reserva))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteReservaController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/clientes/{id}/reservas', {
        responses: {
            '200': {
                description: 'Cliente.Reserva DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Reserva))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteReservaController.prototype, "delete", null);
exports.ClienteReservaController = ClienteReservaController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ClienteRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ClienteRepository])
], ClienteReservaController);
//# sourceMappingURL=cliente-reserva.controller.js.map