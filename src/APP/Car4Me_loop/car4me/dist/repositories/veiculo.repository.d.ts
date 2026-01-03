import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Veiculo, VeiculoRelations, Categoria, Reserva, Manutencao, Cliente, ClienteFavorito } from '../models';
import { CategoriaRepository } from './categoria.repository';
import { ReservaRepository } from './reserva.repository';
import { ManutencaoRepository } from './manutencao.repository';
import { ClienteFavoritoRepository } from './cliente-favorito.repository';
import { ClienteRepository } from './cliente.repository';
export declare class VeiculoRepository extends DefaultCrudRepository<Veiculo, typeof Veiculo.prototype.id_veiculo, VeiculoRelations> {
    protected categoriaRepositoryGetter: Getter<CategoriaRepository>;
    protected reservaRepositoryGetter: Getter<ReservaRepository>;
    protected manutencaoRepositoryGetter: Getter<ManutencaoRepository>;
    protected clienteFavoritoRepositoryGetter: Getter<ClienteFavoritoRepository>;
    protected clienteRepositoryGetter: Getter<ClienteRepository>;
    readonly categoria: BelongsToAccessor<Categoria, typeof Veiculo.prototype.id_veiculo>;
    readonly reservas: HasManyRepositoryFactory<Reserva, typeof Veiculo.prototype.id_veiculo>;
    readonly manutencoes: HasManyRepositoryFactory<Manutencao, typeof Veiculo.prototype.id_veiculo>;
    readonly clientes: HasManyThroughRepositoryFactory<Cliente, typeof Cliente.prototype.id_cliente, ClienteFavorito, typeof Veiculo.prototype.id_veiculo>;
    constructor(dataSource: MysqlDataSource, categoriaRepositoryGetter: Getter<CategoriaRepository>, reservaRepositoryGetter: Getter<ReservaRepository>, manutencaoRepositoryGetter: Getter<ManutencaoRepository>, clienteFavoritoRepositoryGetter: Getter<ClienteFavoritoRepository>, clienteRepositoryGetter: Getter<ClienteRepository>);
}
