import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Funcionario, FuncionarioRelations, Reserva } from '../models';
import { ReservaRepository } from './reserva.repository';
export declare class FuncionarioRepository extends DefaultCrudRepository<Funcionario, typeof Funcionario.prototype.id_funcionario, FuncionarioRelations> {
    protected reservaRepositoryGetter: Getter<ReservaRepository>;
    readonly reservas: HasManyRepositoryFactory<Reserva, typeof Funcionario.prototype.id_funcionario>;
    constructor(dataSource: MysqlDataSource, reservaRepositoryGetter: Getter<ReservaRepository>);
}
