import { Count, Filter, Where } from '@loopback/repository';
import { Categoria, Veiculo } from '../models';
import { CategoriaRepository } from '../repositories';
export declare class CategoriaVeiculoController {
    protected categoriaRepository: CategoriaRepository;
    constructor(categoriaRepository: CategoriaRepository);
    find(id: number, filter?: Filter<Veiculo>): Promise<Veiculo[]>;
    create(id: typeof Categoria.prototype.id_categoria, veiculo: Omit<Veiculo, 'id_veiculo'>): Promise<Veiculo>;
    patch(id: number, veiculo: Partial<Veiculo>, where?: Where<Veiculo>): Promise<Count>;
    delete(id: number, where?: Where<Veiculo>): Promise<Count>;
}
