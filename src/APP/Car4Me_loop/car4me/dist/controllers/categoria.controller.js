"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CategoriaController = class CategoriaController {
    constructor(categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }
    async create(categoria) {
        return this.categoriaRepository.create(categoria);
    }
    async count(where) {
        return this.categoriaRepository.count(where);
    }
    async find() {
        return this.categoriaRepository.find();
    }
    // Mantido: updateAll (PATCH em lote) com "where"
    async updateAll(categoria, where) {
        return this.categoriaRepository.updateAll(categoria, where);
    }
    async findById(id) {
        return this.categoriaRepository.findById(id);
    }
    async updateById(id, categoria) {
        await this.categoriaRepository.updateById(id, categoria);
    }
    async replaceById(id, categoria) {
        await this.categoriaRepository.replaceById(id, categoria);
    }
    async deleteById(id) {
        await this.categoriaRepository.deleteById(id);
    }
};
exports.CategoriaController = CategoriaController;
tslib_1.__decorate([
    (0, rest_1.post)('/categorias'),
    (0, rest_1.response)(200, {
        description: 'Categoria model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Categoria),
                examples: {
                    criado: {
                        summary: 'Categoria criada',
                        value: {
                            id_categoria: 1,
                            nome: 'Económica',
                            preco_dia: 25.0,
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Categoria, {
                    title: 'NewCategoria',
                    exclude: ['id_categoria'],
                }),
                examples: {
                    criar: {
                        summary: 'Criar categoria',
                        value: {
                            nome: 'Económica',
                            preco_dia: 25.0,
                        },
                    },
                    criarSUV: {
                        summary: 'Criar categoria SUV',
                        value: {
                            nome: 'SUV',
                            preco_dia: 45.5,
                        },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriaController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/categorias/count'),
    (0, rest_1.response)(200, {
        description: 'Categoria model count',
        content: {
            'application/json': {
                schema: repository_1.CountSchema,
                examples: {
                    total: { summary: 'Total de categorias', value: { count: 6 } },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Categoria)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriaController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/categorias'),
    (0, rest_1.response)(200, {
        description: 'Array of Categoria model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Categoria, { includeRelations: true }),
                },
                examples: {
                    lista: {
                        summary: 'Lista de categorias',
                        value: [
                            { id_categoria: 1, nome: 'Económica', preco_dia: 25.0 },
                            { id_categoria: 2, nome: 'SUV', preco_dia: 45.5 },
                        ],
                    },
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriaController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/categorias'),
    (0, rest_1.response)(200, {
        description: 'Categoria PATCH success count',
        content: {
            'application/json': {
                schema: repository_1.CountSchema,
                examples: {
                    alteradas: { summary: 'Número de categorias alteradas', value: { count: 2 } },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Categoria, { partial: true }),
                examples: {
                    atualizarPreco: {
                        summary: 'Atualizar preço/dia em lote',
                        value: { preco_dia: 29.99 },
                    },
                    renomear: {
                        summary: 'Atualizar nome em lote',
                        value: { nome: 'Económica Plus' },
                    },
                },
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Categoria)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriaController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/categorias/{id}'),
    (0, rest_1.response)(200, {
        description: 'Categoria model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Categoria, { includeRelations: true }),
                examples: {
                    detalhe: {
                        summary: 'Categoria por id',
                        value: {
                            id_categoria: 1,
                            nome: 'Económica',
                            preco_dia: 25.0,
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriaController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/categorias/{id}'),
    (0, rest_1.response)(204, {
        description: 'Categoria PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Categoria, { partial: true }),
                examples: {
                    mudarPreco: {
                        summary: 'Alterar preço/dia',
                        value: { preco_dia: 27.5 },
                    },
                    mudarNome: {
                        summary: 'Alterar nome',
                        value: { nome: 'Económica Plus' },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriaController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/categorias/{id}'),
    (0, rest_1.response)(204, {
        description: 'Categoria PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Categoria, { exclude: ['id_categoria'] }),
                examples: {
                    substituir: {
                        summary: 'Substituir categoria (PUT)',
                        value: {
                            nome: 'SUV',
                            preco_dia: 45.5,
                        },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriaController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/categorias/{id}'),
    (0, rest_1.response)(204, {
        description: 'Categoria DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriaController.prototype, "deleteById", null);
exports.CategoriaController = CategoriaController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.CategoriaRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CategoriaRepository])
], CategoriaController);
//# sourceMappingURL=categoria.controller.js.map