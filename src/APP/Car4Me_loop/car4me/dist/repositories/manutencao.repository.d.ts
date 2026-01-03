import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Manutencao, ManutencaoRelations, Veiculo } from '../models';
import { VeiculoRepository } from './veiculo.repository';
export declare class ManutencaoRepository extends DefaultCrudRepository<Manutencao, typeof Manutencao.prototype.id_manutencao, ManutencaoRelations> {
    protected veiculoRepositoryGetter: Getter<VeiculoRepository>;
    readonly veiculo: BelongsToAccessor<Veiculo, typeof Manutencao.prototype.id_manutencao>;
    constructor(dataSource: MysqlDataSource, veiculoRepositoryGetter: Getter<VeiculoRepository>);
}
