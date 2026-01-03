import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Reserva, ReservaRelations, Cliente, Funcionario, Veiculo } from '../models';
import { ClienteRepository } from './cliente.repository';
import { FuncionarioRepository } from './funcionario.repository';
import { VeiculoRepository } from './veiculo.repository';
export declare class ReservaRepository extends DefaultCrudRepository<Reserva, typeof Reserva.prototype.id_reserva, ReservaRelations> {
    protected clienteRepositoryGetter: Getter<ClienteRepository>;
    protected funcionarioRepositoryGetter: Getter<FuncionarioRepository>;
    protected veiculoRepositoryGetter: Getter<VeiculoRepository>;
    readonly cliente: BelongsToAccessor<Cliente, typeof Reserva.prototype.id_reserva>;
    readonly funcionario: BelongsToAccessor<Funcionario, typeof Reserva.prototype.id_reserva>;
    readonly veiculo: BelongsToAccessor<Veiculo, typeof Reserva.prototype.id_reserva>;
    constructor(dataSource: MysqlDataSource, clienteRepositoryGetter: Getter<ClienteRepository>, funcionarioRepositoryGetter: Getter<FuncionarioRepository>, veiculoRepositoryGetter: Getter<VeiculoRepository>);
}
