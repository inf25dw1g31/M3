import { Entity } from '@loopback/repository';
export declare class Manutencao extends Entity {
    id_manutencao?: number;
    descricao: string;
    data_manutencao: string;
    custo?: number;
    id_veiculo: number;
    constructor(data?: Partial<Manutencao>);
}
export interface ManutencaoRelations {
}
export type ManutencaoWithRelations = Manutencao & ManutencaoRelations;
