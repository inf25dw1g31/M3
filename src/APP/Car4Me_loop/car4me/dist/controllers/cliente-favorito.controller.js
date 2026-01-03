"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteFavoritoController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ClienteFavoritoController = class ClienteFavoritoController {
    constructor(clienteFavoritoRepository) {
        this.clienteFavoritoRepository = clienteFavoritoRepository;
    }
    async create(clienteFavorito) {
        return this.clienteFavoritoRepository.create(clienteFavorito);
    }
    async count(where) {
        return this.clienteFavoritoRepository.count(where);
    }
    async find() {
        // Sem parâmetro filter - retorna TUDO sempre
        return this.clienteFavoritoRepository.find();
    }
    async findById(id_cliente, id_veiculo) {
        // Usar findOne com where ao invés de findById para chave composta
        const favorito = await this.clienteFavoritoRepository.findOne({
            where: {
                id_cliente: id_cliente,
                id_veiculo: id_veiculo,
            },
        });
        if (!favorito) {
            const error = new Error('Entity not found');
            error.statusCode = 404;
            throw error;
        }
        return favorito;
    }
    async deleteById(id_cliente, id_veiculo) {
        // Usar deleteAll com where ao invés de deleteById para chave composta
        await this.clienteFavoritoRepository.deleteAll({
            id_cliente: id_cliente,
            id_veiculo: id_veiculo,
        });
    }
};
exports.ClienteFavoritoController = ClienteFavoritoController;
tslib_1.__decorate([
    (0, rest_1.post)('/cliente-favoritos'),
    (0, rest_1.response)(200, {
        description: 'ClienteFavorito model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.ClienteFavorito) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.ClienteFavorito, {
                    title: 'NewClienteFavorito',
                    exclude: [],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.ClienteFavorito]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteFavoritoController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/cliente-favoritos/count'),
    (0, rest_1.response)(200, {
        description: 'ClienteFavorito model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.ClienteFavorito)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteFavoritoController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/cliente-favoritos'),
    (0, rest_1.response)(200, {
        description: 'Array of ClienteFavorito model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.ClienteFavorito, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteFavoritoController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.get)('/cliente-favoritos/{id_cliente}/{id_veiculo}'),
    (0, rest_1.response)(200, {
        description: 'ClienteFavorito model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.ClienteFavorito, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id_cliente')),
    tslib_1.__param(1, rest_1.param.path.number('id_veiculo')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteFavoritoController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/cliente-favoritos/{id_cliente}/{id_veiculo}'),
    (0, rest_1.response)(204, {
        description: 'ClienteFavorito DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id_cliente')),
    tslib_1.__param(1, rest_1.param.path.number('id_veiculo')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteFavoritoController.prototype, "deleteById", null);
exports.ClienteFavoritoController = ClienteFavoritoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ClienteFavoritoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ClienteFavoritoRepository])
], ClienteFavoritoController);
//# sourceMappingURL=cliente-favorito.controller.js.map