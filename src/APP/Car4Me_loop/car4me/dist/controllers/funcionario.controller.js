"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let FuncionarioController = class FuncionarioController {
    constructor(funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }
    async create(funcionario) {
        return this.funcionarioRepository.create(funcionario);
    }
    async count(where) {
        return this.funcionarioRepository.count(where);
    }
    async find() {
        return this.funcionarioRepository.find();
    }
    // Mantido: updateAll (PATCH em lote) com "where"
    async updateAll(funcionario, where) {
        return this.funcionarioRepository.updateAll(funcionario, where);
    }
    async findById(id) {
        return this.funcionarioRepository.findById(id);
    }
    async updateById(id, funcionario) {
        await this.funcionarioRepository.updateById(id, funcionario);
    }
    async replaceById(id, funcionario) {
        await this.funcionarioRepository.replaceById(id, funcionario);
    }
    async deleteById(id) {
        await this.funcionarioRepository.deleteById(id);
    }
};
exports.FuncionarioController = FuncionarioController;
tslib_1.__decorate([
    (0, rest_1.post)('/funcionarios'),
    (0, rest_1.response)(200, {
        description: 'Funcionario model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Funcionario),
                examples: {
                    criado: {
                        summary: 'Funcionário criado',
                        value: {
                            id_funcionario: 1,
                            nome: 'João Silva',
                            email: 'joao.silva@car4me.pt',
                            cargo: 'Atendimento',
                            telefone: '912345678',
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Funcionario, {
                    title: 'NewFuncionario',
                    exclude: ['id_funcionario'],
                }),
                examples: {
                    criar: {
                        summary: 'Criar funcionário',
                        value: {
                            nome: 'João Silva',
                            email: 'joao.silva@car4me.pt',
                            cargo: 'Atendimento',
                            telefone: '912345678',
                        },
                    },
                    criarSemTelefone: {
                        summary: 'Criar funcionário (telefone opcional)',
                        value: {
                            nome: 'Ana Costa',
                            email: 'ana.costa@car4me.pt',
                            cargo: 'Gestor',
                        },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FuncionarioController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/funcionarios/count'),
    (0, rest_1.response)(200, {
        description: 'Funcionario model count',
        content: {
            'application/json': {
                schema: repository_1.CountSchema,
                examples: {
                    total: { summary: 'Total de funcionários', value: { count: 7 } },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Funcionario)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FuncionarioController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/funcionarios'),
    (0, rest_1.response)(200, {
        description: 'Array of Funcionario model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Funcionario, { includeRelations: true }),
                },
                examples: {
                    lista: {
                        summary: 'Lista de funcionários',
                        value: [
                            {
                                id_funcionario: 1,
                                nome: 'João Silva',
                                email: 'joao.silva@car4me.pt',
                                cargo: 'Atendimento',
                                telefone: '912345678',
                            },
                            {
                                id_funcionario: 2,
                                nome: 'Ana Costa',
                                email: 'ana.costa@car4me.pt',
                                cargo: 'Gestor',
                                telefone: '934567890',
                            },
                        ],
                    },
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FuncionarioController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/funcionarios'),
    (0, rest_1.response)(200, {
        description: 'Funcionario PATCH success count',
        content: {
            'application/json': {
                schema: repository_1.CountSchema,
                examples: {
                    alterados: { summary: 'Número de funcionários alterados', value: { count: 2 } },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Funcionario, { partial: true }),
                examples: {
                    atualizarCargo: {
                        summary: 'Atualizar cargo em lote',
                        value: { cargo: 'Atendimento' },
                    },
                    atualizarTelefone: {
                        summary: 'Atualizar telefone em lote',
                        value: { telefone: '910000000' },
                    },
                },
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Funcionario)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FuncionarioController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/funcionarios/{id}'),
    (0, rest_1.response)(200, {
        description: 'Funcionario model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Funcionario, { includeRelations: true }),
                examples: {
                    detalhe: {
                        summary: 'Funcionário por id',
                        value: {
                            id_funcionario: 1,
                            nome: 'João Silva',
                            email: 'joao.silva@car4me.pt',
                            cargo: 'Atendimento',
                            telefone: '912345678',
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
], FuncionarioController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/funcionarios/{id}'),
    (0, rest_1.response)(204, {
        description: 'Funcionario PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Funcionario, { partial: true }),
                examples: {
                    mudarCargo: {
                        summary: 'Alterar cargo',
                        value: { cargo: 'Gestor' },
                    },
                    mudarTelefone: {
                        summary: 'Alterar telefone',
                        value: { telefone: '913333333' },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FuncionarioController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/funcionarios/{id}'),
    (0, rest_1.response)(204, {
        description: 'Funcionario PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Funcionario, { exclude: ['id_funcionario'] }),
                examples: {
                    substituir: {
                        summary: 'Substituir funcionário (PUT)',
                        value: {
                            nome: 'João Silva',
                            email: 'joao.silva@car4me.pt',
                            cargo: 'Atendimento',
                            telefone: '912345678',
                        },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FuncionarioController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/funcionarios/{id}'),
    (0, rest_1.response)(204, {
        description: 'Funcionario DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], FuncionarioController.prototype, "deleteById", null);
exports.FuncionarioController = FuncionarioController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.FuncionarioRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.FuncionarioRepository])
], FuncionarioController);
//# sourceMappingURL=funcionario.controller.js.map