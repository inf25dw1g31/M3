import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, Reserva, Veiculo, ClienteFavorito} from '../models';
import {ReservaRepository} from './reserva.repository';
import {ClienteFavoritoRepository} from './cliente-favorito.repository';
import {VeiculoRepository} from './veiculo.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id_cliente,
  ClienteRelations
> {

  public readonly reservas: HasManyRepositoryFactory<Reserva, typeof Cliente.prototype.id_cliente>;

  public readonly veiculos: HasManyThroughRepositoryFactory<Veiculo, typeof Veiculo.prototype.id_veiculo,
          ClienteFavorito,
          typeof Cliente.prototype.id_cliente
        >;

  constructor(
    @inject('datasources.db') dataSource: MysqlDataSource, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>, @repository.getter('ClienteFavoritoRepository') protected clienteFavoritoRepositoryGetter: Getter<ClienteFavoritoRepository>, @repository.getter('VeiculoRepository') protected veiculoRepositoryGetter: Getter<VeiculoRepository>,
  ) {
    super(Cliente, dataSource);
    this.veiculos = this.createHasManyThroughRepositoryFactoryFor('veiculos', veiculoRepositoryGetter, clienteFavoritoRepositoryGetter,);
    this.registerInclusionResolver('veiculos', this.veiculos.inclusionResolver);
    this.reservas = this.createHasManyRepositoryFactoryFor('reservas', reservaRepositoryGetter,);
    this.registerInclusionResolver('reservas', this.reservas.inclusionResolver);
  }
}
