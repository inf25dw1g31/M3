"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeiculoRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let VeiculoRepository = class VeiculoRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, categoriaRepositoryGetter, reservaRepositoryGetter, manutencaoRepositoryGetter, clienteFavoritoRepositoryGetter, clienteRepositoryGetter) {
        super(models_1.Veiculo, dataSource);
        this.categoriaRepositoryGetter = categoriaRepositoryGetter;
        this.reservaRepositoryGetter = reservaRepositoryGetter;
        this.manutencaoRepositoryGetter = manutencaoRepositoryGetter;
        this.clienteFavoritoRepositoryGetter = clienteFavoritoRepositoryGetter;
        this.clienteRepositoryGetter = clienteRepositoryGetter;
        this.clientes = this.createHasManyThroughRepositoryFactoryFor('clientes', clienteRepositoryGetter, clienteFavoritoRepositoryGetter);
        this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
        this.manutencoes = this.createHasManyRepositoryFactoryFor('manutencoes', manutencaoRepositoryGetter);
        this.registerInclusionResolver('manutencoes', this.manutencoes.inclusionResolver);
        this.reservas = this.createHasManyRepositoryFactoryFor('reservas', reservaRepositoryGetter);
        this.registerInclusionResolver('reservas', this.reservas.inclusionResolver);
        this.categoria = this.createBelongsToAccessorFor('categoria', categoriaRepositoryGetter);
        this.registerInclusionResolver('categoria', this.categoria.inclusionResolver);
    }
};
exports.VeiculoRepository = VeiculoRepository;
exports.VeiculoRepository = VeiculoRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mysql')),
    tslib_1.__param(1, repository_1.repository.getter('CategoriaRepository')),
    tslib_1.__param(2, repository_1.repository.getter('ReservaRepository')),
    tslib_1.__param(3, repository_1.repository.getter('ManutencaoRepository')),
    tslib_1.__param(4, repository_1.repository.getter('ClienteFavoritoRepository')),
    tslib_1.__param(5, repository_1.repository.getter('ClienteRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function, Function, Function, Function])
], VeiculoRepository);
//# sourceMappingURL=veiculo.repository.js.map