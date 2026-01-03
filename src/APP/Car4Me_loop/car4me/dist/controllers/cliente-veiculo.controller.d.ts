import { Count, Filter, Where } from '@loopback/repository';
import { Cliente, Veiculo } from '../models';
import { ClienteRepository } from '../repositories';
export declare class ClienteVeiculoController {
    protected clienteRepository: ClienteRepository;
    constructor(clienteRepository: ClienteRepository);
    find(id: number, filter?: Filter<Veiculo>): Promise<Veiculo[]>;
    create(id: typeof Cliente.prototype.id_cliente, veiculo: Omit<Veiculo, 'id_veiculo'>): Promise<Veiculo>;
    patch(id: number, veiculo: Partial<Veiculo>, where?: Where<Veiculo>): Promise<Count>;
    delete(id: number, where?: Where<Veiculo>): Promise<Count>;
}
