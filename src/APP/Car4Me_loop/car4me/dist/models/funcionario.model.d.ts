import { Entity } from '@loopback/repository';
import { Reserva } from './reserva.model';
export declare class Funcionario extends Entity {
    id_funcionario?: number;
    nome: string;
    email: string;
    cargo?: string;
    telefone?: string;
    reservas: Reserva[];
    constructor(data?: Partial<Funcionario>);
}
export interface FuncionarioRelations {
}
export type FuncionarioWithRelations = Funcionario & FuncionarioRelations;
