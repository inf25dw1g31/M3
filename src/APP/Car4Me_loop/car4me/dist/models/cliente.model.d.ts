import { Entity } from '@loopback/repository';
import { Reserva } from './reserva.model';
import { Veiculo } from './veiculo.model';
export declare class Cliente extends Entity {
    id_cliente?: number;
    nome: string;
    email: string;
    telefone?: string;
    nif: string;
    morada?: string;
    reservas: Reserva[];
    veiculos: Veiculo[];
    constructor(data?: Partial<Cliente>);
}
export interface ClienteRelations {
}
export type ClienteWithRelations = Cliente & ClienteRelations;
