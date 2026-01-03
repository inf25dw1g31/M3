import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Funcionario, FuncionarioRelations, Reserva} from '../models';
import {ReservaRepository} from './reserva.repository';

export class FuncionarioRepository extends DefaultCrudRepository<
  Funcionario,
  typeof Funcionario.prototype.id_funcionario,
  FuncionarioRelations
> {

  public readonly reservas: HasManyRepositoryFactory<Reserva, typeof Funcionario.prototype.id_funcionario>;

  constructor(
    @inject('datasources.db') dataSource: MysqlDataSource, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>,
  ) {
    super(Funcionario, dataSource);
    this.reservas = this.createHasManyRepositoryFactoryFor('reservas', reservaRepositoryGetter,);
    this.registerInclusionResolver('reservas', this.reservas.inclusionResolver);
  }
}
