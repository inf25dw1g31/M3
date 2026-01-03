import {Entity, model, property, hasMany} from '@loopback/repository';
import {Veiculo} from './veiculo.model';

@model({settings: {mysql: {table: 'categorias'}}})


export class Categoria extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_categoria?: number;

  @property({
    type: 'string',
    required: true,
    //adicionar validação [Sabemos que é feita na BD, mas fica aqui para reforçar]
    jsonSchema: {maxLength: 50},
  })
  nome: string;

  @property({
    type: 'number',
    required: true,
  })
  preco_dia: number;

  @hasMany(() => Veiculo, {keyTo: 'id_categoria'})
  veiculos: Veiculo[];

  constructor(data?: Partial<Categoria>) {
    super(data);
  }
}

export interface CategoriaRelations {
  // describe navigational properties here
}

export type CategoriaWithRelations = Categoria & CategoriaRelations;
