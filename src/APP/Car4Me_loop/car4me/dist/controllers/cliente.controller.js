"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ClienteController = class ClienteController {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async create(cliente) {
        return this.clienteRepository.create(cliente);
    }
    async count(where) {
        return this.clienteRepository.count(where);
    }
    async find() {
        return this.clienteRepository.find();
    }
    // Mantido: updateAll (PATCH em lote) com "where"
    async updateAll(cliente, where) {
        return this.clienteRepository.updateAll(cliente, where);
    }
    async findById(id) {
        return this.clienteRepository.findById(id);
    }
    async updateById(id, cliente) {
        await this.clienteRepository.updateById(id, cliente);
    }
    async replaceById(id, cliente) {
        await this.clienteRepository.replaceById(id, cliente);
    }
    async deleteById(id) {
        await this.clienteRepository.deleteById(id);
    }
};
exports.ClienteController = ClienteController;
tslib_1.__decorate([
    (0, rest_1.post)('/clientes'),
    (0, rest_1.response)(200, {
        description: 'Cliente model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Cliente),
                examples: {
                    criado: {
                        summary: 'Cliente criado',
                        value: {
                            id_cliente: 1,
                            nome: 'Miguel Santos',
                            email: 'miguel.santos@email.pt',
                            telefone: '913456789',
                            nif: '245678901',
                            morada: 'Rua das Flores, 10, Porto',
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Cliente, {
                    title: 'NewCliente',
                    exclude: ['id_cliente'],
                }),
                examples: {
                    criar: {
                        summary: 'Criar cliente',
                        value: {
                            nome: 'Miguel Santos',
                            email: 'miguel.santos@email.pt',
                            telefone: '913456789',
                            nif: '245678901',
                            morada: 'Rua das Flores, 10, Porto',
                        },
                    },
                    criarSemTelefone: {
                        summary: 'Criar cliente (telefone opcional)',
                        value: {
                            nome: 'Sara Almeida',
                            email: 'sara.almeida@email.pt',
                            nif: '298765432',
                            morada: 'Av. da Liberdade, 100, Lisboa',
                        },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/clientes/count'),
    (0, rest_1.response)(200, {
        description: 'Cliente model count',
        content: {
            'application/json': {
                schema: repository_1.CountSchema,
                examples: {
                    total: { summary: 'Total de clientes', value: { count: 50 } },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Cliente)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/clientes'),
    (0, rest_1.response)(200, {
        description: 'Array of Cliente model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Cliente, { includeRelations: true }),
                },
                examples: {
                    lista: {
                        summary: 'Lista de clientes',
                        value: [
                            {
                                id_cliente: 1,
                                nome: 'Miguel Santos',
                                email: 'miguel.santos@email.pt',
                                telefone: '913456789',
                                nif: '245678901',
                                morada: 'Rua das Flores, 10, Porto',
                            },
                            {
                                id_cliente: 2,
                                nome: 'Sara Almeida',
                                email: 'sara.almeida@email.pt',
                                telefone: '919999999',
                                nif: '298765432',
                                morada: 'Av. da Liberdade, 100, Lisboa',
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
], ClienteController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/clientes'),
    (0, rest_1.response)(200, {
        description: 'Cliente PATCH success count',
        content: {
            'application/json': {
                schema: repository_1.CountSchema,
                examples: {
                    alterados: { summary: 'Número de clientes alterados', value: { count: 2 } },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Cliente, { partial: true }),
                examples: {
                    atualizarMorada: {
                        summary: 'Atualizar morada em lote',
                        value: { morada: 'Lisboa' },
                    },
                    atualizarTelefone: {
                        summary: 'Atualizar telefone em lote',
                        value: { telefone: '910000000' },
                    },
                },
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Cliente)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/clientes/{id}'),
    (0, rest_1.response)(200, {
        description: 'Cliente model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Cliente, { includeRelations: true }),
                examples: {
                    detalhe: {
                        summary: 'Cliente por id',
                        value: {
                            id_cliente: 1,
                            nome: 'Miguel Santos',
                            email: 'miguel.santos@email.pt',
                            telefone: '913456789',
                            nif: '245678901',
                            morada: 'Rua das Flores, 10, Porto',
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
], ClienteController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/clientes/{id}'),
    (0, rest_1.response)(204, {
        description: 'Cliente PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Cliente, { partial: true }),
                examples: {
                    mudarMorada: {
                        summary: 'Alterar morada',
                        value: { morada: 'Rua Nova, 50, Braga' },
                    },
                    mudarTelefone: {
                        summary: 'Alterar telefone',
                        value: { telefone: '912222222' },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/clientes/{id}'),
    (0, rest_1.response)(204, {
        description: 'Cliente PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Cliente, { exclude: ['id_cliente'] }),
                examples: {
                    substituir: {
                        summary: 'Substituir cliente (PUT)',
                        value: {
                            nome: 'Miguel Santos',
                            email: 'miguel.santos@email.pt',
                            telefone: '913456789',
                            nif: '245678901',
                            morada: 'Rua das Flores, 10, Porto',
                        },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/clientes/{id}'),
    (0, rest_1.response)(204, {
        description: 'Cliente DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ClienteController.prototype, "deleteById", null);
exports.ClienteController = ClienteController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ClienteRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ClienteRepository])
], ClienteController);
//# sourceMappingURL=cliente.controller.js.map