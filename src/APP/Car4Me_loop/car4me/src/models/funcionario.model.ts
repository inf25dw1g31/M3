import {Entity, model, property, hasMany} from '@loopback/repository';
import {Reserva} from './reserva.model';

@model({settings: {mysql: {table: 'funcionarios'}}})
export class Funcionario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_funcionario?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  cargo?: string;

  @property({
    type: 'string',
  })
  telefone?: string;

  @hasMany(() => Reserva, {keyTo: 'id_funcionario'})
  reservas: Reserva[];

  constructor(data?: Partial<Funcionario>) {
    super(data);
  }
}

export interface FuncionarioRelations {
  // describe navigational properties here
}

export type FuncionarioWithRelations = Funcionario & FuncionarioRelations;
