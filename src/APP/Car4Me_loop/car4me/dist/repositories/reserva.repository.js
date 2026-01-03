"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let ReservaRepository = class ReservaRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, clienteRepositoryGetter, funcionarioRepositoryGetter, veiculoRepositoryGetter) {
        super(models_1.Reserva, dataSource);
        this.clienteRepositoryGetter = clienteRepositoryGetter;
        this.funcionarioRepositoryGetter = funcionarioRepositoryGetter;
        this.veiculoRepositoryGetter = veiculoRepositoryGetter;
        this.veiculo = this.createBelongsToAccessorFor('veiculo', veiculoRepositoryGetter);
        this.registerInclusionResolver('veiculo', this.veiculo.inclusionResolver);
        this.funcionario = this.createBelongsToAccessorFor('funcionario', funcionarioRepositoryGetter);
        this.registerInclusionResolver('funcionario', this.funcionario.inclusionResolver);
        this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter);
        this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    }
};
exports.ReservaRepository = ReservaRepository;
exports.ReservaRepository = ReservaRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mysql')),
    tslib_1.__param(1, repository_1.repository.getter('ClienteRepository')),
    tslib_1.__param(2, repository_1.repository.getter('FuncionarioRepository')),
    tslib_1.__param(3, repository_1.repository.getter('VeiculoRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function, Function])
], ReservaRepository);
//# sourceMappingURL=reserva.repository.js.map