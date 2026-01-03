import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Funcionario} from './funcionario.model';
import {Veiculo} from './veiculo.model';


//Adicionar conexação tabela base de dados
@model({settings: {mysql: {table: 'reservas'}}})
export class Reserva extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_reserva?: number;
  @property({
    type: 'date',
    required: true,
  })
  data_inicio: Date;
  //Mudança de tipo de dado de string para date

  @property({
    type: 'date',
    required: true,
  })
  data_fim: Date;

  //Mudança de tipo de dado de string para date
  @belongsTo(() => Cliente, {name: 'cliente'})
  id_cliente: number;

  @belongsTo(() => Funcionario, {name: 'funcionario'})
  id_funcionario: number;

  @belongsTo(() => Veiculo, {name: 'veiculo'})
  id_veiculo: number;
  @property({
    type: 'number',
  })
  preco_total?: number;
  //Adicionado enum para estado da reserva
  @property({
    type: 'string',
    jsonSchema: {
      enum: ['ativa', 'concluida', 'cancelada'],
      default: 'ativa',
    },
    default: 'ativa',
  })
  estado?: string;


  constructor(data?: Partial<Reserva>) {
    super(data);
  }
}

export interface ReservaRelations {
  // describe navigational properties here
}

export type ReservaWithRelations = Reserva & ReservaRelations;
