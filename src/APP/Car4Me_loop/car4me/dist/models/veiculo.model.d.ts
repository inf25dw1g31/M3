import { Entity } from '@loopback/repository';
import { Reserva } from './reserva.model';
import { Manutencao } from './manutencao.model';
import { Cliente } from './cliente.model';
export declare class Veiculo extends Entity {
    id_veiculo?: number;
    marca: string;
    modelo: string;
    matricula: string;
    ano: number;
    cor?: string;
    quilometragem?: number;
    id_categoria: number;
    reservas: Reserva[];
    manutencoes: Manutencao[];
    clientes: Cliente[];
    estado?: string;
    constructor(data?: Partial<Veiculo>);
}
export interface VeiculoRelations {
}
export type VeiculoWithRelations = Veiculo & VeiculoRelations;
