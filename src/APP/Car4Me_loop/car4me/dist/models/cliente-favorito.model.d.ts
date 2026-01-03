import { Entity } from '@loopback/repository';
export declare class ClienteFavorito extends Entity {
    id_cliente: number;
    id_veiculo: number;
    constructor(data?: Partial<ClienteFavorito>);
}
export interface ClienteFavoritoRelations {
}
export type ClienteFavoritoWithRelations = ClienteFavorito & ClienteFavoritoRelations;
