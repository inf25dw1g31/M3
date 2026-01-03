import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Cliente, ClienteRelations, Reserva, Veiculo, ClienteFavorito } from '../models';
import { ReservaRepository } from './reserva.repository';
import { ClienteFavoritoRepository } from './cliente-favorito.repository';
import { VeiculoRepository } from './veiculo.repository';
export declare class ClienteRepository extends DefaultCrudRepository<Cliente, typeof Cliente.prototype.id_cliente, ClienteRelations> {
    protected reservaRepositoryGetter: Getter<ReservaRepository>;
    protected clienteFavoritoRepositoryGetter: Getter<ClienteFavoritoRepository>;
    protected veiculoRepositoryGetter: Getter<VeiculoRepository>;
    readonly reservas: HasManyRepositoryFactory<Reserva, typeof Cliente.prototype.id_cliente>;
    readonly veiculos: HasManyThroughRepositoryFactory<Veiculo, typeof Veiculo.prototype.id_veiculo, ClienteFavorito, typeof Cliente.prototype.id_cliente>;
    constructor(dataSource: MysqlDataSource, reservaRepositoryGetter: Getter<ReservaRepository>, clienteFavoritoRepositoryGetter: Getter<ClienteFavoritoRepository>, veiculoRepositoryGetter: Getter<VeiculoRepository>);
}
