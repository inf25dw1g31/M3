import {Entity, model, property, hasMany} from '@loopback/repository';
import {Reserva} from './reserva.model';
import {Veiculo} from './veiculo.model';
import {ClienteFavorito} from './cliente-favorito.model';

@model({settings: {mysql: {table: 'clientes'}}})
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_cliente?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
    required: true,
    //adicionar validação de email [Sabemos que é feita na BD, mas fica aqui para reforçar]
    jsonSchema: {maxLength: 150, format: 'email'},
  })
  email: string;

  @property({
    type: 'string',
  })
  telefone?: string;

  @property({
    type: 'string',
    required: true,
    //adicionar validação de NIF [Sabemos que é feita na BD]
    jsonSchema: {minLength: 9, maxLength: 9, pattern: '^[0-9]+$'},
  })
  nif: string;

  @property({
    type: 'string',
  })
  morada?: string;

  @hasMany(() => Reserva, {keyTo: 'id_cliente'})
  reservas: Reserva[];

  @hasMany(() => Veiculo, {through: {model: () => ClienteFavorito, keyFrom: 'id_cliente', keyTo: 'id_veiculo'}})
  veiculos: Veiculo[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
