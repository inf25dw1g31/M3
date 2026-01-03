import {Entity, model, property} from '@loopback/repository';

@model({settings: {mysql: {table: 'clientes_favoritos'}}})
export class ClienteFavorito extends Entity {
  


  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id_cliente: number;

  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id_veiculo: number;


  constructor(data?: Partial<ClienteFavorito>) {
    super(data);
  }
}

export interface ClienteFavoritoRelations {
  // describe navigational properties here
}

export type ClienteFavoritoWithRelations = ClienteFavorito & ClienteFavoritoRelations;
