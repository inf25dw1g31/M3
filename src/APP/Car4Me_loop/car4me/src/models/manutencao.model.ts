import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Veiculo} from './veiculo.model';

@model({settings: {mysql: {table: 'manutencoes'}}})
export class Manutencao extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_manutencao?: number;
  @property({
    type: 'string',
    required: true,
  })
  descricao: string;

  @property({
    type: 'date',
    required: true,
  })
  data_manutencao: string;

  @property({
    type: 'number',
  })
  custo?: number;

  @belongsTo(() => Veiculo, {name: 'veiculo'})
  id_veiculo: number;

  constructor(data?: Partial<Manutencao>) {
    super(data);
  }
}

export interface ManutencaoRelations {
  // describe navigational properties here
}

export type ManutencaoWithRelations = Manutencao & ManutencaoRelations;
