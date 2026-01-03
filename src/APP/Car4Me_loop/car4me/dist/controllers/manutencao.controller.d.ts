import { Count, Where } from '@loopback/repository';
import { Manutencao } from '../models';
import { ManutencaoRepository } from '../repositories';
export declare class ManutencaoController {
    manutencaoRepository: ManutencaoRepository;
    constructor(manutencaoRepository: ManutencaoRepository);
    create(manutencao: Omit<Manutencao, 'id_manutencao'>): Promise<Manutencao>;
    count(): Promise<Count>;
    find(): Promise<Manutencao[]>;
    findById(id: number): Promise<Manutencao>;
    updateAll(manutencao: Partial<Manutencao>, where?: Where<Manutencao>): Promise<Count>;
    updateById(id: number, manutencao: Partial<Manutencao>): Promise<void>;
    replaceById(id: number, manutencao: Omit<Manutencao, 'id_manutencao'>): Promise<void>;
    deleteById(id: number): Promise<void>;
}
