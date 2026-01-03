import { Entity } from '@loopback/repository';
import { Veiculo } from './veiculo.model';
export declare class Categoria extends Entity {
    id_categoria?: number;
    nome: string;
    preco_dia: number;
    veiculos: Veiculo[];
    constructor(data?: Partial<Categoria>);
}
export interface CategoriaRelations {
}
export type CategoriaWithRelations = Categoria & CategoriaRelations;
