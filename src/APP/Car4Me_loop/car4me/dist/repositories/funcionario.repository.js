"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let FuncionarioRepository = class FuncionarioRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, reservaRepositoryGetter) {
        super(models_1.Funcionario, dataSource);
        this.reservaRepositoryGetter = reservaRepositoryGetter;
        this.reservas = this.createHasManyRepositoryFactoryFor('reservas', reservaRepositoryGetter);
        this.registerInclusionResolver('reservas', this.reservas.inclusionResolver);
    }
};
exports.FuncionarioRepository = FuncionarioRepository;
exports.FuncionarioRepository = FuncionarioRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mysql')),
    tslib_1.__param(1, repository_1.repository.getter('ReservaRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function])
], FuncionarioRepository);
//# sourceMappingURL=funcionario.repository.js.map