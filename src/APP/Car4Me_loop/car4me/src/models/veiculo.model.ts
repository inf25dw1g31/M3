import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Categoria} from './categoria.model';
import {Reserva} from './reserva.model';
import {Manutencao} from './manutencao.model';
import {Cliente} from './cliente.model';
import {ClienteFavorito} from './cliente-favorito.model';

@model({settings: {mysql: {table: 'veiculos'}}})
export class Veiculo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_veiculo?: number;
  //Adicionado enum com marcas de carros mais comuns
  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: [
        'Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Renault', 'Peugeot', 'Citroen', 'Toyota',
        'Nissan', 'Honda', 'Hyundai', 'Kia', 'Ford', 'Opel', 'Volvo', 'Fiat', 'Seat', 'Skoda',
        'Mazda', 'Mitsubishi', 'Jeep', 'Land Rover', 'Mini', 'Porsche', 'Lexus', 'Subaru',
        'Alfa Romeo', 'Dacia', 'Jaguar', 'Chevrolet',
      ],
    }
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {maxLength: 20},
  })
  matricula: string;

  @property({
    type: 'number',
    required: true,
  })
  ano: number;

  @property({
    type: 'string',
  })
  cor?: string;

  @property({
    type: 'number',
    default: 0,
  })
  quilometragem?: number;

  @belongsTo(() => Categoria, {name: 'categoria'})
  id_categoria: number;

  @hasMany(() => Reserva, {keyTo: 'id_veiculo'})
  reservas: Reserva[];

  @hasMany(() => Manutencao, {keyTo: 'id_veiculo'})
  manutencoes: Manutencao[];

  @hasMany(() => Cliente, {through: {model: () => ClienteFavorito, keyFrom: 'id_veiculo', keyTo: 'id_cliente'}})
  clientes: Cliente[];
  //Adicionado enum para estado do veiculo
  @property({
    type: 'string',
    jsonSchema: {
      enum: ['Disponivel', 'Alugado', 'Manutencao'],
      default: 'Disponivel',
    },
    default: 'Disponivel',
  })
  estado?: string;

  constructor(data?: Partial<Veiculo>) {
    super(data);
  }
}

export interface VeiculoRelations {
  // describe navigational properties here
}

export type VeiculoWithRelations = Veiculo & VeiculoRelations;
