import { Count, Where } from '@loopback/repository';
import { ClienteFavorito } from '../models';
import { ClienteFavoritoRepository } from '../repositories';
export declare class ClienteFavoritoController {
    clienteFavoritoRepository: ClienteFavoritoRepository;
    constructor(clienteFavoritoRepository: ClienteFavoritoRepository);
    create(clienteFavorito: ClienteFavorito): Promise<ClienteFavorito>;
    count(where?: Where<ClienteFavorito>): Promise<Count>;
    find(): Promise<ClienteFavorito[]>;
    findById(id_cliente: number, id_veiculo: number): Promise<ClienteFavorito>;
    deleteById(id_cliente: number, id_veiculo: number): Promise<void>;
}
