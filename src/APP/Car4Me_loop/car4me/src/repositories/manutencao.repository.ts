import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Manutencao, ManutencaoRelations, Veiculo} from '../models';
import {VeiculoRepository} from './veiculo.repository';

export class ManutencaoRepository extends DefaultCrudRepository<
  Manutencao,
  typeof Manutencao.prototype.id_manutencao,
  ManutencaoRelations
> {

  public readonly veiculo: BelongsToAccessor<Veiculo, typeof Manutencao.prototype.id_manutencao>;

  constructor(
    @inject('datasources.db') dataSource: MysqlDataSource, @repository.getter('VeiculoRepository') protected veiculoRepositoryGetter: Getter<VeiculoRepository>,
  ) {
    super(Manutencao, dataSource);
    this.veiculo = this.createBelongsToAccessorFor('veiculo', veiculoRepositoryGetter,);
    this.registerInclusionResolver('veiculo', this.veiculo.inclusionResolver);
  }
}
