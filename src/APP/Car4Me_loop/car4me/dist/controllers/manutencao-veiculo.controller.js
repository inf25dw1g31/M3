"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManutencaoVeiculoController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ManutencaoVeiculoController = class ManutencaoVeiculoController {
    constructor(manutencaoRepository) {
        this.manutencaoRepository = manutencaoRepository;
    }
    async getVeiculo(id) {
        return this.manutencaoRepository.veiculo(id);
    }
};
exports.ManutencaoVeiculoController = ManutencaoVeiculoController;
tslib_1.__decorate([
    (0, rest_1.get)('/manutencaos/{id}/veiculo', {
        responses: {
            '200': {
                description: 'Veiculo belonging to Manutencao',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.Veiculo),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ManutencaoVeiculoController.prototype, "getVeiculo", null);
exports.ManutencaoVeiculoController = ManutencaoVeiculoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ManutencaoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ManutencaoRepository])
], ManutencaoVeiculoController);
//# sourceMappingURL=manutencao-veiculo.controller.js.map