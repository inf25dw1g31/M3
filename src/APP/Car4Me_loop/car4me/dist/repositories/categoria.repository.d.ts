import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Categoria, CategoriaRelations, Veiculo } from '../models';
import { VeiculoRepository } from './veiculo.repository';
export declare class CategoriaRepository extends DefaultCrudRepository<Categoria, typeof Categoria.prototype.id_categoria, CategoriaRelations> {
    protected veiculoRepositoryGetter: Getter<VeiculoRepository>;
    readonly veiculos: HasManyRepositoryFactory<Veiculo, typeof Categoria.prototype.id_categoria>;
    constructor(dataSource: MysqlDataSource, veiculoRepositoryGetter: Getter<VeiculoRepository>);
}
