"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioReservaController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let FuncionarioReservaController = class FuncionarioReservaController {
    constructor(funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }
    async find(id, filter) {
        return this.funcionarioRepository.reservas(id).find(filter);
    }
    async create(id, reserva) {
        return this.funcionarioRepository.reservas(id).create(reserva);
    }
    async patch(id, reserva, where) {
        return this.funcionarioRepository.reservas(id).patch(reserva, where);
    }
    async delete(id, where) {
        return this.funcionarioRepository.reservas(id).delete(where);
    }
};
exports.FuncionarioReservaController = FuncionarioReservaController;
tslib_1.__decorate([
    (0, rest_1.get)('/funcionarios/{id}/reservas', {
        responses: {
            '200': {
                description: 'Array of Funcionario has many Reserva',
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
], FuncionarioReservaController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/funcionarios/{id}/reservas', {
        responses: {
            '200': {
                description: 'Funcionario model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Reserva) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Reserva, {
                    title: 'NewReservaInFuncionario',
                    exclude: ['id_reserva'],
                    optional: ['id_funcionario']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FuncionarioReservaController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/funcionarios/{id}/reservas', {
        responses: {
            '200': {
                description: 'Funcionario.Reserva PATCH success count',
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
], FuncionarioReservaController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/funcionarios/{id}/reservas', {
        responses: {
            '200': {
                description: 'Funcionario.Reserva DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Reserva))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FuncionarioReservaController.prototype, "delete", null);
exports.FuncionarioReservaController = FuncionarioReservaController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.FuncionarioRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.FuncionarioRepository])
], FuncionarioReservaController);
//# sourceMappingURL=funcionario-reserva.controller.js.map