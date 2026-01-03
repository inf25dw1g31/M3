"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManutencaoRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let ManutencaoRepository = class ManutencaoRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, veiculoRepositoryGetter) {
        super(models_1.Manutencao, dataSource);
        this.veiculoRepositoryGetter = veiculoRepositoryGetter;
        this.veiculo = this.createBelongsToAccessorFor('veiculo', veiculoRepositoryGetter);
        this.registerInclusionResolver('veiculo', this.veiculo.inclusionResolver);
    }
};
exports.ManutencaoRepository = ManutencaoRepository;
exports.ManutencaoRepository = ManutencaoRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mysql')),
    tslib_1.__param(1, repository_1.repository.getter('VeiculoRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function])
], ManutencaoRepository);
//# sourceMappingURL=manutencao.repository.js.map