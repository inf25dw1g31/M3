import { Entity } from '@loopback/repository';
export declare class Reserva extends Entity {
    id_reserva?: number;
    data_inicio: Date;
    data_fim: Date;
    id_cliente: number;
    id_funcionario: number;
    id_veiculo: number;
    preco_total?: number;
    estado?: string;
    constructor(data?: Partial<Reserva>);
}
export interface ReservaRelations {
}
export type ReservaWithRelations = Reserva & ReservaRelations;
