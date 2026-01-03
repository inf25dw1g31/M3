import { Count, Where } from '@loopback/repository';
import { Cliente } from '../models';
import { ClienteRepository } from '../repositories';
export declare class ClienteController {
    clienteRepository: ClienteRepository;
    constructor(clienteRepository: ClienteRepository);
    create(cliente: Omit<Cliente, 'id_cliente'>): Promise<Cliente>;
    count(where?: Where<Cliente>): Promise<Count>;
    find(): Promise<Cliente[]>;
    updateAll(cliente: Partial<Cliente>, where?: Where<Cliente>): Promise<Count>;
    findById(id: number): Promise<Cliente>;
    updateById(id: number, cliente: Partial<Cliente>): Promise<void>;
    replaceById(id: number, cliente: Omit<Cliente, 'id_cliente'>): Promise<void>;
    deleteById(id: number): Promise<void>;
}
