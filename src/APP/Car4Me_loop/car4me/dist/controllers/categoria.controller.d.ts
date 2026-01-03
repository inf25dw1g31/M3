import { Count, Where } from '@loopback/repository';
import { Categoria } from '../models';
import { CategoriaRepository } from '../repositories';
export declare class CategoriaController {
    categoriaRepository: CategoriaRepository;
    constructor(categoriaRepository: CategoriaRepository);
    create(categoria: Omit<Categoria, 'id_categoria'>): Promise<Categoria>;
    count(where?: Where<Categoria>): Promise<Count>;
    find(): Promise<Categoria[]>;
    updateAll(categoria: Partial<Categoria>, where?: Where<Categoria>): Promise<Count>;
    findById(id: number): Promise<Categoria>;
    updateById(id: number, categoria: Partial<Categoria>): Promise<void>;
    replaceById(id: number, categoria: Omit<Categoria, 'id_categoria'>): Promise<void>;
    deleteById(id: number): Promise<void>;
}
