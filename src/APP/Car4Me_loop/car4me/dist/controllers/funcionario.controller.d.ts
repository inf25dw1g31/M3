import { Count, Where } from '@loopback/repository';
import { Funcionario } from '../models';
import { FuncionarioRepository } from '../repositories';
export declare class FuncionarioController {
    funcionarioRepository: FuncionarioRepository;
    constructor(funcionarioRepository: FuncionarioRepository);
    create(funcionario: Omit<Funcionario, 'id_funcionario'>): Promise<Funcionario>;
    count(where?: Where<Funcionario>): Promise<Count>;
    find(): Promise<Funcionario[]>;
    updateAll(funcionario: Partial<Funcionario>, where?: Where<Funcionario>): Promise<Count>;
    findById(id: number): Promise<Funcionario>;
    updateById(id: number, funcionario: Partial<Funcionario>): Promise<void>;
    replaceById(id: number, funcionario: Omit<Funcionario, 'id_funcionario'>): Promise<void>;
    deleteById(id: number): Promise<void>;
}
