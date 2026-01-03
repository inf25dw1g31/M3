import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { ClienteFavorito, ClienteFavoritoRelations } from '../models';
export declare class ClienteFavoritoRepository extends DefaultCrudRepository<ClienteFavorito, typeof ClienteFavorito.prototype.id_cliente, ClienteFavoritoRelations> {
    constructor(dataSource: MysqlDataSource);
}
