"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaVeiculoController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CategoriaVeiculoController = class CategoriaVeiculoController {
    constructor(categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }
    async find(id, filter) {
        return this.categoriaRepository.veiculos(id).find(filter);
    }
    async create(id, veiculo) {
        return this.categoriaRepository.veiculos(id).create(veiculo);
    }
    async patch(id, veiculo, where) {
        return this.categoriaRepository.veiculos(id).patch(veiculo, where);
    }
    async delete(id, where) {
        return this.categoriaRepository.veiculos(id).delete(where);
    }
};
exports.CategoriaVeiculoController = CategoriaVeiculoController;
tslib_1.__decorate([
    (0, rest_1.get)('/categorias/{id}/veiculos', {
        responses: {
            '200': {
                description: 'Array of Categoria has many Veiculo',
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
], CategoriaVeiculoController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/categorias/{id}/veiculos', {
        responses: {
            '200': {
                description: 'Categoria model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Veiculo) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Veiculo, {
                    title: 'NewVeiculoInCategoria',
                    exclude: ['id_veiculo'],
                    optional: ['id_categoria']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriaVeiculoController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/categorias/{id}/veiculos', {
        responses: {
            '200': {
                description: 'Categoria.Veiculo PATCH success count',
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
], CategoriaVeiculoController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/categorias/{id}/veiculos', {
        responses: {
            '200': {
                description: 'Categoria.Veiculo DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Veiculo))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriaVeiculoController.prototype, "delete", null);
exports.CategoriaVeiculoController = CategoriaVeiculoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.CategoriaRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CategoriaRepository])
], CategoriaVeiculoController);
//# sourceMappingURL=categoria-veiculo.controller.js.map