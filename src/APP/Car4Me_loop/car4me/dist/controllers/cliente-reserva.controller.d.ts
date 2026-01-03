import { Count, Filter, Where } from '@loopback/repository';
import { Cliente, Reserva } from '../models';
import { ClienteRepository } from '../repositories';
export declare class ClienteReservaController {
    protected clienteRepository: ClienteRepository;
    constructor(clienteRepository: ClienteRepository);
    find(id: number, filter?: Filter<Reserva>): Promise<Reserva[]>;
    create(id: typeof Cliente.prototype.id_cliente, reserva: Omit<Reserva, 'id_reserva'>): Promise<Reserva>;
    patch(id: number, reserva: Partial<Reserva>, where?: Where<Reserva>): Promise<Count>;
    delete(id: number, where?: Where<Reserva>): Promise<Count>;
}
