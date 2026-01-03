import { Count, Filter, Where } from '@loopback/repository';
import { Funcionario, Reserva } from '../models';
import { FuncionarioRepository } from '../repositories';
export declare class FuncionarioReservaController {
    protected funcionarioRepository: FuncionarioRepository;
    constructor(funcionarioRepository: FuncionarioRepository);
    find(id: number, filter?: Filter<Reserva>): Promise<Reserva[]>;
    create(id: typeof Funcionario.prototype.id_funcionario, reserva: Omit<Reserva, 'id_reserva'>): Promise<Reserva>;
    patch(id: number, reserva: Partial<Reserva>, where?: Where<Reserva>): Promise<Count>;
    delete(id: number, where?: Where<Reserva>): Promise<Count>;
}
