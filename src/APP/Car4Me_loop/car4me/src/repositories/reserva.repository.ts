import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Reserva, ReservaRelations, Cliente, Funcionario, Veiculo} from '../models';
import {ClienteRepository} from './cliente.repository';
import {FuncionarioRepository} from './funcionario.repository';
import {VeiculoRepository} from './veiculo.repository';

export class ReservaRepository extends DefaultCrudRepository<
  Reserva,
  typeof Reserva.prototype.id_reserva,
  ReservaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Reserva.prototype.id_reserva>;

  public readonly funcionario: BelongsToAccessor<Funcionario, typeof Reserva.prototype.id_reserva>;

  public readonly veiculo: BelongsToAccessor<Veiculo, typeof Reserva.prototype.id_reserva>;

  constructor(
    @inject('datasources.db') dataSource: MysqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('FuncionarioRepository') protected funcionarioRepositoryGetter: Getter<FuncionarioRepository>, @repository.getter('VeiculoRepository') protected veiculoRepositoryGetter: Getter<VeiculoRepository>,
  ) {
    super(Reserva, dataSource);
    this.veiculo = this.createBelongsToAccessorFor('veiculo', veiculoRepositoryGetter,);
    this.registerInclusionResolver('veiculo', this.veiculo.inclusionResolver);
    this.funcionario = this.createBelongsToAccessorFor('funcionario', funcionarioRepositoryGetter,);
    this.registerInclusionResolver('funcionario', this.funcionario.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
