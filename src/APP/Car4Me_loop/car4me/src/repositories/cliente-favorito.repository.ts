import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources'; 
import {ClienteFavorito, ClienteFavoritoRelations} from '../models';

export class ClienteFavoritoRepository extends DefaultCrudRepository<
  ClienteFavorito,
  typeof ClienteFavorito.prototype.id_cliente,
  ClienteFavoritoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: MysqlDataSource,
  ) {
    super(ClienteFavorito, dataSource);
  }
}
