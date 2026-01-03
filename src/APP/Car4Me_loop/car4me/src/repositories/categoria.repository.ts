import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources'; 
import {Categoria, CategoriaRelations, Veiculo} from '../models';
import {VeiculoRepository} from './veiculo.repository';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.id_categoria,
  CategoriaRelations
> {

  public readonly veiculos: HasManyRepositoryFactory<Veiculo, typeof Categoria.prototype.id_categoria>;

  constructor(
    @inject('datasources.db') dataSource: MysqlDataSource, @repository.getter('VeiculoRepository') protected veiculoRepositoryGetter: Getter<VeiculoRepository>,
  ) {
    super(Categoria, dataSource);
    this.veiculos = this.createHasManyRepositoryFactoryFor('veiculos', veiculoRepositoryGetter,);
    this.registerInclusionResolver('veiculos', this.veiculos.inclusionResolver);
  }
}
