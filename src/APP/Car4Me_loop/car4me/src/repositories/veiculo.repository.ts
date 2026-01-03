import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Veiculo, VeiculoRelations, Categoria, Reserva, Manutencao, Cliente, ClienteFavorito} from '../models';
import {CategoriaRepository} from './categoria.repository';
import {ReservaRepository} from './reserva.repository';
import {ManutencaoRepository} from './manutencao.repository';
import {ClienteFavoritoRepository} from './cliente-favorito.repository';
import {ClienteRepository} from './cliente.repository';

export class VeiculoRepository extends DefaultCrudRepository<
  Veiculo,
  typeof Veiculo.prototype.id_veiculo,
  VeiculoRelations
> {

  public readonly categoria: BelongsToAccessor<Categoria, typeof Veiculo.prototype.id_veiculo>;

  public readonly reservas: HasManyRepositoryFactory<Reserva, typeof Veiculo.prototype.id_veiculo>;

  public readonly manutencoes: HasManyRepositoryFactory<Manutencao, typeof Veiculo.prototype.id_veiculo>;

  public readonly clientes: HasManyThroughRepositoryFactory<Cliente, typeof Cliente.prototype.id_cliente,
          ClienteFavorito,
          typeof Veiculo.prototype.id_veiculo
        >;

  constructor(
    @inject('datasources.db') dataSource: MysqlDataSource, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>, @repository.getter('ManutencaoRepository') protected manutencaoRepositoryGetter: Getter<ManutencaoRepository>, @repository.getter('ClienteFavoritoRepository') protected clienteFavoritoRepositoryGetter: Getter<ClienteFavoritoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Veiculo, dataSource);
    this.clientes = this.createHasManyThroughRepositoryFactoryFor('clientes', clienteRepositoryGetter, clienteFavoritoRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.manutencoes = this.createHasManyRepositoryFactoryFor('manutencoes', manutencaoRepositoryGetter,);
    this.registerInclusionResolver('manutencoes', this.manutencoes.inclusionResolver);
    this.reservas = this.createHasManyRepositoryFactoryFor('reservas', reservaRepositoryGetter,);
    this.registerInclusionResolver('reservas', this.reservas.inclusionResolver);
    this.categoria = this.createBelongsToAccessorFor('categoria', categoriaRepositoryGetter,);
    this.registerInclusionResolver('categoria', this.categoria.inclusionResolver);
  }
}
